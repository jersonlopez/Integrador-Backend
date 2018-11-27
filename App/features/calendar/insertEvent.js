const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const { rootPath } = require('../../../config');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'App/features/calendar/token.json';

// Load client secrets from a local file.
fs.readFile(rootPath + '/App/features/calendar/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), saveEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
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
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function saveEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });

  console.log('###################### auth ####################\n');
  console.log(auth);
  console.log('\n#######################################################\n');
  // calendar.events.insert(
  //   {
  //     auth: auth,
  //     calendarId: 'primary',
  //     resource: event
  //   },
  //   function(err, event) {
  //     if (err) {
  //       console.log('There was an error contacting the Calendar service: ' + err);
  //       return;
  //     }
  //     console.log('###################### events ####################\n');
  //     console.log(event);
  //     console.log('\n#######################################################\n');
  //     //console.log('Event created: %s', event.htmlLink);
  //   }
  // );
}

// https://www.youtube.com/watch?v=Qd64idiKZWw
// https://developers.google.com/calendar/create-events
// America/Bogota

// var event = {
//   'summary': 'Google I/O 2018',
//   'description': 'A chance to hear more about Google\'s developer products.',
//   'start': {
//     'dateTime': '2018-09-14T11:00:00-05:00',
//     'timeZone': 'America/Bogota',
//   },
//   'end': {
//     'dateTime': '2018-09-14T12:00:00-05:00',
//     'timeZone': 'America/Bogota',
//   },
//   'recurrence': [
//     'RRULE:FREQ=DAILY;COUNT=2'
//   ],
//   'attendees': [
//     {'email': 'johna.galeano@udea.edu.co'},
//     {'email': 'sergioa.castrillon@udea.edu.co'},
//   ],
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10},
//     ],
//   },
// };
