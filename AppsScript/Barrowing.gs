/******************************************************************
 CAMANSIHAN FARMERS ASSOCIATION PORTAL
 Borrowing.gs
******************************************************************/

/*=========================================================
GET ALL BORROWED EQUIPMENT
=========================================================*/

function getBorrowings() {

  try {

    return readSheet(
      SHEETS.BORROWING
    );

  }

  catch (err) {

    throw new Error(err.message);

  }

}

/*=========================================================
BORROW COUNT
=========================================================*/

function borrowingCount() {

  return getBorrowings().length;

}

/*=========================================================
GET BORROW
=========================================================*/

function getBorrow(id) {

  const records = getBorrowings();

  const item = records.find(function(record){

    return text(record["Borrow ID"]) === text(id);

  });

  return item || null;

}
/*=========================================================
BORROW EQUIPMENT
=========================================================*/

function borrowEquipment(data) {

  try {

    data = validateBorrow(data);

    appendSheet(

      SHEETS.BORROWING,

      data

    );

    updateEquipmentAvailability(

      data["Equipment ID"],

      -1

    );

    return success(

      "Equipment borrowed successfully."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
VALIDATE BORROW
=========================================================*/

function validateBorrow(data) {

  if (!text(data["Borrow ID"])) {

    data["Borrow ID"] =

      generateBorrowID();

  }

  if (!text(data["Member ID"])) {

    throw new Error(
      "Member ID is required."
    );

  }

  if (!text(data["Equipment ID"])) {

    throw new Error(
      "Equipment ID is required."
    );

  }

  if (!text(data["Borrow Date"])) {

    data["Borrow Date"] =

      today();

  }

  if (!text(data["Status"])) {

    data["Status"] =

      "BORROWED";

  }

  return data;

}
/*=========================================================
RETURN EQUIPMENT
=========================================================*/

function returnEquipment(borrowID) {

  try {

    const row = findRow(

      SHEETS.BORROWING,

      "Borrow ID",

      borrowID

    );

    if (row < 2) {

      return failed(
        "Borrow record not found."
      );

    }

    const sh = sheet(SHEETS.BORROWING);

    const values =

      sh

        .getRange(

          row,

          1,

          1,

          sh.getLastColumn()

        )

        .getValues()[0];

    const equipmentID = values[2];

    sh.getRange(row,5)

      .setValue(today());

    sh.getRange(row,6)

      .setValue("RETURNED");

    updateEquipmentAvailability(

      equipmentID,

      1

    );

    return success(

      "Equipment returned."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
UPDATE AVAILABLE
=========================================================*/

function updateEquipmentAvailability(

  equipmentID,

  change

) {

  const row = findRow(

    SHEETS.EQUIPMENT,

    "Equipment ID",

    equipmentID

  );

  if (row < 2) return;

  const sh = sheet(

    SHEETS.EQUIPMENT

  );

  const available =

    Number(

      sh.getRange(row,5)

        .getValue()

    ) || 0;

  sh.getRange(row,5)

    .setValue(

      available + change

    );

}

/*=========================================================
SEARCH BORROWING
=========================================================*/

function searchBorrowings(keyword) {

  keyword =

    text(keyword)

    .toLowerCase();

  return getBorrowings().filter(function(item){

    return Object.values(item)

      .join(" ")

      .toLowerCase()

      .includes(keyword);

  });

}
