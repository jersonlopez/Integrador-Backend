'use strict';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'App/features/calendar/token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
exports.authorize = async oAuth2Client => {
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
exports.getAccessToken = (oAuth2Client) => {
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
exports.listEvents = (auth) => {
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
exports.saveEvents = (auth, event, calendarId) => {
  const calendar = google.calendar({ version: 'v3', auth });
  
  const options = {
    auth: auth,
    calendarId: calendarId,
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