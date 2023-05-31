const dbConnection = require("./database.js");

exports.runQuery = (cmd) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(cmd, (err, rows, _) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
