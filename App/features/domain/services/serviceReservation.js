'use strict';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const { rootPath } = require('../../../../config');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'App/features/calendar/token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
let authorize = async oAuth2Client => {
  // Check if we have previously stored a token.
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (token === undefined) {
        resolve(token);
        return;
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', code => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        resolve(oAuth2Client);
      });
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  const options = {
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  };

  return new Promise((resolve, reject) => {
    calendar.events.list(options, (err, res) => {
      if (err) {
        reject('The API returned an error: ' + err);
        return;
      }
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map(event => {
          const start = event.start.dateTime || event.start.date;
          const end = event.end.dateTime || event.end.date;
          console.log(`${start} - ${end} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
      if (res.data.items) resolve(res.data.items);
    });
  });
}

/**
 * Insert a new event on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function saveEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  const options = {
    auth: auth,
    calendarId: 'primary',
    resource: event
  };

  return new Promise((resolve, reject) => {
    calendar.events.insert(options, function(err, event) {
      if (err) {
        reject('There was an error contacting the Calendar service: ' + err);
        return;
      }
      resolve(event.data);
    });
  });
}

let event = {
  summary: 'Google I/O 2018',
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: '2018-09-29T13:00:00-05:00',
    timeZone: 'America/Bogota'
  },
  end: {
    dateTime: '2018-09-29T14:00:00-05:00',
    timeZone: 'America/Bogota'
  },
  recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
  reminders: {
    useDefault: false,
    overrides: [{ method: 'email', minutes: 24 * 60 }, { method: 'popup', minutes: 10 }]
  }
};

const saveNewEvents = () => {
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
      const result = await saveEvents(auth);
      console.log('###################### result ####################\n');
      console.log(result);
      console.log('\n#######################################################\n');
      resolve(result)
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

module.exports = {
  getEvents,
  saveNewEvents
};
