import config from "../helpers/config";

export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Data!A2:I" 
      })
      .then(
        response => {
          const data = response.result.values;
          const players =
            data.map(player => ({
              firstName: player[0],
              lastName: player[1],
              firstPosition: player[2],
              secondPosition: player[3],
              photo: player[8]
            })) || [];
          callback({
            players
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}