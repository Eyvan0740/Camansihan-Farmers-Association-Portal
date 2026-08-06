/******************************************************************
 CAMANSIHAN FARMERS ASSOCIATION PORTAL
 Code.gs
 Version 1.0
******************************************************************/

/*=========================================================
 APPLICATION
=========================================================*/

const APP_NAME = "CAMANSIHAN FARMERS ASSOCIATION PORTAL";

const APP_VERSION = "9.9.9";

/*=========================================================
 DATABASE
=========================================================*/

/*
Replace this with your Spreadsheet ID
*/

const SPREADSHEET_ID = "1QClSGsUg6BJ24KGAMiTuWx5sPqXn7oOv";

/*=========================================================
 SHEET NAMES
=========================================================*/

const SHEETS = {

  USERS: "USERS",

  MEMBERS: "MEMBERS",

 FERTILIZER:"FERTILIZER",

SEEDS:"SEEDS FUND",

HARVEST:"EVERY HARVEST",

  EQUIPMENT: "EQUIPMENT",

BORROWING:"BORROWED EQUIPMENT"

};

/*=========================================================
 DATABASE
=========================================================*/

function database() {

  return SpreadsheetApp.openById(
    SPREADSHEET_ID
  );

}

/*=========================================================
 SHEET
=========================================================*/

function sheet(name) {

  const sh =
    database().getSheetByName(name);

  if (!sh) {

    throw new Error(
      "Sheet not found : " + name
    );

  }

  return sh;

}

/*=========================================================
 READ SHEET
 Returns Array of Objects
=========================================================*/

function readSheet(name) {

  const sh = sheet(name);

  const values =
    sh.getDataRange().getValues();

  if (values.length <= 1) {

    return [];

  }

  const headers =
    values.shift();

  return values.map(function (row) {

    let obj = {};

    headers.forEach(function (header, index) {

      obj[String(header).trim()] =
        row[index];

    });

    return obj;

  });

}

/*=========================================================
 WRITE SHEET
=========================================================*/

function appendSheet(name, object) {

  const sh = sheet(name);

  const headers =
    sh
      .getRange(
        1,
        1,
        1,
        sh.getLastColumn()
      )
      .getValues()[0];

  const row = [];

  headers.forEach(function (header) {

    row.push(

      object[header] || ""

    );

  });

  sh.appendRow(row);

}

/*=========================================================
 UPDATE ROW
=========================================================*/

function updateSheet(name, rowNumber, object) {

  const sh = sheet(name);

  const headers =
    sh
      .getRange(
        1,
        1,
        1,
        sh.getLastColumn()
      )
      .getValues()[0];

  const row = [];

  headers.forEach(function (header) {

    row.push(

      object[header] || ""

    );

  });

  sh
    .getRange(
      rowNumber,
      1,
      1,
      row.length
    )
    .setValues([row]);

}

/*=========================================================
 DELETE ROW
=========================================================*/

function deleteSheetRow(name, rowNumber) {

  sheet(name).deleteRow(rowNumber);

}

/*=========================================================
 SUCCESS RESPONSE
=========================================================*/

function success(message, data) {

  return {

    success: true,

    message: message,

    data: data || null

  };

}

/*=========================================================
 ERROR RESPONSE
=========================================================*/

function failed(message) {

  return {

    success: false,

    message: message

  };

}

/*=========================================================
 INCLUDE HTML
=========================================================*/

function include(filename) {

  return HtmlService

    .createHtmlOutputFromFile(filename)

    .getContent();

}

/*=========================================================
 WEB APP
=========================================================*/

function doGet() {

  return HtmlService

    .createTemplateFromFile("index")

    .evaluate()

    .setTitle(APP_NAME)

    .setXFrameOptionsMode(

      HtmlService.XFrameOptionsMode.ALLOWALL

    );

}
/*=========================================================
 TODAY
=========================================================*/

function today() {

  return Utilities.formatDate(

    new Date(),

    Session.getScriptTimeZone(),

    "yyyy-MM-dd"

  );

}

/*=========================================================
 CURRENT DATE & TIME
=========================================================*/

function now() {

  return Utilities.formatDate(

    new Date(),

    Session.getScriptTimeZone(),

    "yyyy-MM-dd HH:mm:ss"

  );

}

/*=========================================================
 FORMAT DATE
=========================================================*/

function formatDate(date) {

  if (!date) return "";

  return Utilities.formatDate(

    new Date(date),

    Session.getScriptTimeZone(),

    "yyyy-MM-dd"

  );

}

/*=========================================================
 FORMAT CURRENCY
=========================================================*/

function peso(amount) {

  amount = Number(amount) || 0;

  return "₱" +

    amount.toLocaleString(

      "en-PH",

      {

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

      }

    );

}

/*=========================================================
 NEXT ROW
=========================================================*/

function nextRow(sheetName) {

  return sheet(sheetName)

    .getLastRow() + 1;

}

/*=========================================================
 FIND ROW BY COLUMN VALUE
=========================================================*/

function findRow(sheetName, columnName, value) {

  const sh = sheet(sheetName);

  const values =

    sh.getDataRange().getValues();

  if (values.length <= 1) {

    return -1;

  }

  const headers = values[0];

  const column =

    headers.indexOf(columnName);

  if (column < 0) {

    return -1;

  }

  for (let r = 1; r < values.length; r++) {

const sheetValue = String(values[r][column]).trim();
const searchValue = String(value).trim();

Logger.log(
  "Sheet: [" + sheetValue + "]  Search: [" + searchValue + "]"
);

if (sheetValue === searchValue) {

  Logger.log("FOUND ROW: " + (r + 1));

  return r + 1;

}

}

  return -1;

}
/*=========================================================
 GENERATE MEMBER ID
=========================================================*/

function generateMemberID() {

  const total =

    sheet(SHEETS.MEMBERS)

      .getLastRow();

  return "MBR-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 GENERATE FERTILIZER ID
=========================================================*/

function generateFertilizerID() {

  const total =
    sheet(SHEETS.FERTILIZER)
      .getLastRow();

  return "FER-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 GENERATE SEEDS FUND ID
=========================================================*/

function generateSeedID() {

  const total =
    sheet(SHEETS.SEEDS)
      .getLastRow();

  return "SED-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 GENERATE HARVEST ID
=========================================================*/

function generateHarvestID() {

  const total =
    sheet(SHEETS.HARVEST)
      .getLastRow();

  return "HRV-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 GENERATE EQUIPMENT ID
=========================================================*/

function generateEquipmentID() {

  const total =

    sheet(SHEETS.EQUIPMENT)

      .getLastRow();

  return "EQP-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 GENERATE BORROW ID
=========================================================*/

function generateBorrowID() {

  const total =

    sheet(SHEETS.BORROWING)

      .getLastRow();

  return "BRW-" +

    Utilities.formatString(

      "%05d",

      Math.max(1, total)

    );

}

/*=========================================================
 IS EMPTY
=========================================================*/

function isEmpty(value) {

  return (

    value === null ||

    value === undefined ||

    value === ""

  );

}

/*=========================================================
 SAFE STRING
=========================================================*/

function text(value) {

  if (isEmpty(value)) {

    return "";

  }

  return String(value).trim();

}

/*=========================================================
 SAFE NUMBER
=========================================================*/

function number(value) {

  value = Number(value);

  return isNaN(value)

    ? 0

    : value;

}
/*=========================================================
 LOGIN
=========================================================*/

function login(username, password) {

  try {

    username = text(username);
    password = text(password);

    if (username === "") {
      return failed("Username is required.");
    }

    if (password === "") {
      return failed("Password is required.");
    }

    const users = readSheet(SHEETS.USERS);

    const user = users.find(function (u) {

      return (
        text(u["Username"]) === username &&
        text(u["Password"]) === password
      );

    });

    if (!user) {

      return failed(
        "Invalid username or password."
      );

    }

    return success(

      "Login successful.",

      {

        username: user["Username"],

        fullname: user["Fullname"],

        role: user["Role"]

      }

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
 CHECK USER
=========================================================*/

function userExists(username) {

  const users = readSheet(SHEETS.USERS);

  return users.some(function (u) {

    return text(u["Username"]) === text(username);

  });

}

/*=========================================================
 CHANGE PASSWORD
=========================================================*/

function changePassword(

  username,

  oldPassword,

  newPassword

) {

  try {

    const row = findRow(

      SHEETS.USERS,

      "Username",

      username

    );

    if (row < 2) {

      return failed("User not found.");

    }

    const sh = sheet(SHEETS.USERS);

    const headers =

      sh

        .getRange(

          1,

          1,

          1,

          sh.getLastColumn()

        )

        .getValues()[0];

    const values =

      sh

        .getRange(

          row,

          1,

          1,

          sh.getLastColumn()

        )

        .getValues()[0];

    const passwordColumn =

      headers.indexOf("Password");

    if (passwordColumn < 0) {

      return failed(

        "Password column not found."

      );

    }

    if (

      text(values[passwordColumn]) !==

      text(oldPassword)

    ) {

      return failed(

        "Current password is incorrect."

      );

    }

    sh

      .getRange(

        row,

        passwordColumn + 1

      )

      .setValue(newPassword);

    return success(

      "Password successfully changed."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
 TEST CONNECTION
=========================================================*/

function testConnection() {

  try {

    database();

    return success(

      "Database connection successful."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}
