'use strict';

const fs = require('fs'),
  { google } = require('googleapis');

const { authorize, getAccessToken, listEvents, saveEvents } = require('../../calendar/calendar'),
  { studentInformation, authentication } = require('../../consumptionMares/consumptionMares'),
  { save, update, find, remove } = require('../repository/crud'),
  { rootPath } = require('../../../../config');


const { reservation } = require('../entities/Reservation');

const saveNewEvents = (event, calendarId) => {
  // Load client secrets from a local file.
  return new Promise((resolve, reject) => {
    fs.readFile(rootPath + '/App/features/calendar/credentials.json', async (err, content) => {
      if (err) reject('Error loading client secret file: ' + err);
      // Authorize a client with credentials, then call the Google Calendar API.
      const credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      const auth = await authorize(oAuth2Client);

      if (auth === undefined) {
        getAccessToken(oAuth2Client);
        return;
      }
      const result = await saveEvents(auth, event, calendarId);
      console.log('###################### result crear event ####################\n');
      console.log(result);
      console.log('\n#######################################################\n');
      resolve(result);
      //   if (result.length) {
      //     resolve(result);
      //   } else {
      //     resolve('No upcoming events found.');
      //   }
    });
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const getEvents = () => {
  // Load client secrets from a local file.
  return new Promise((resolve, reject) => {
    fs.readFile(rootPath + '/App/features/calendar/credentials.json', async (err, content) => {
      if (err) reject('Error loading client secret file: ' + err);
      // Authorize a client with credentials, then call the Google Calendar API.
      const credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      const auth = await authorize(oAuth2Client);

      if (auth === undefined) {
        getAccessToken(oAuth2Client);
        return;
      }
      const result = await listEvents(auth);

      if (result.length) {
        resolve(result);
      } else {
        resolve('No upcoming events found.');
      }
    });
  });
};

const deleteEvents = event => {
  // Load client secrets from a local file.
  return new Promise((resolve, reject) => {
    fs.readFile(rootPath + '/App/features/calendar/credentials.json', async (err, content) => {
      if (err) reject('Error loading client secret file: ' + err);
      // Authorize a client with credentials, then call the Google Calendar API.
      const credentials = JSON.parse(content);
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      const auth = await authorize(oAuth2Client);

      if (auth === undefined) {
        getAccessToken(oAuth2Client);
        return;
      }
      const result = await saveEvents(auth, event);
      console.log('###################### result ####################\n');
      console.log(result);
      console.log('\n#######################################################\n');
      resolve(result);
      //   if (result.length) {
      //     resolve(result);
      //   } else {
      //     resolve('No upcoming events found.');
      //   }
    });
  });
};

let studentData;

const saveReservation = async (req) => {
  let rule = 4 * 3600000
  let until = new Date().getTime() + rule

  await authentication(req.usuario, req.clave).then((data) => {

      if (!!parseInt(data.data) == false) {
          return ({ "message": "Usuario o Contraseña Incorrectos" })
      } else {
          if (parseInt(data.data) != parseInt(req.id)) {
              return ({ "message": "No es usuario activo de la Universidad de Antioquia" })
          } else {
              studentData = {
                  id: parseInt(data.data)
              }
          }
      }
  });

  let filter = { id: req.id }
  let projection = '-_id -__v -attendant -typeImplement -observation'
  let doc = await find(reservation, filter, projection)

  if (doc.length > 0) {
    let rightNow = new Date().getTime()
    let untilUser = doc[doc.length - 1].until
    if (parseInt(rightNow) <= parseInt(untilUser)) {
        return ({ "message": "Ya tiene una reserva agendada; no puede hacer más reservas" })
    } else {
        return sendReservation(req, until)
    }
  } else {
    return sendReservation(req, until)
  }

}

const sendReservation = async (req, until) => {
  let i = 0;

  await studentInformation(req.id).then((data) => {
      studentData.name = data.data[0].nombre + " " + data.data[0].apellidos
      studentData.phone = data.data[0].telefono
      studentData.email = data.data[0].emailInstitucional
  })

  // let newReservation = new reservation({
  //     id: studentData.id,
  //     name: studentData.name,
  //     reservationDate: req.body.reservationDate,
  //     typeConsole: req.body.typeConsole,
  //     phone: studentData.phone,
  //     hourIn: req.body.hourIn,
  //     controlQuantity: req.body.controlQuantity,
  //     email: studentData.email,
  //     videoGame: req.body.videoGame,
  //     role: "Responsable",
  //     until: until
  // })

  let newReservation = new reservation({
    id: studentData.id,
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone,
    reservationDate: req.reservationDate,
    hourStart: req.hourStart,
    hourEnd: req.hourEnd,
    headquarter: req.headquarter,
    space: req.spaceName,
    until: until,
    event: req.event
  })

  let filter = { hourIn: req.hourStart, resevationDate: req.resevationDate }
  let projection = '-_id -__v -name -id -phone'
  let doc = await find(reservation, filter, projection)

  if (doc.length > 0) {
    return ({ "message": "Esta hora ya esta reservada" })
  } else {            
    await save(newReservation)

    req.event.attendees.push({email: studentData.email})

    await saveNewEvents(req.event, req.calendarId)
  }

  return ({ "message": "RESERVACION GUARDADA" })
}

const getReservationByDayBySpace = async (req) => {
  let filter = { headquarter: req.headquarter, space: req.space, reservationDate: req.dateIn }
  let projection = '-_id -__v -name -phone -email -until'
  let doc = await find(reservation, filter, projection)

  if (doc.length > 0) {
    return doc;
  } else {
      return ({ "message": "No hay reservas" })
  }
};

module.exports = {
  getEvents,
  saveNewEvents,
  deleteEvents,
  saveReservation,
  getReservationByDayBySpace
};
