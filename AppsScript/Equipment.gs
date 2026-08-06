/******************************************************************
 CAMANSIHAN FARMERS ASSOCIATION PORTAL
 Equipment.gs
******************************************************************/

/*=========================================================
GET ALL EQUIPMENT
=========================================================*/

function getEquipment() {

  try {

    return readSheet(
      SHEETS.EQUIPMENT
    );

  }

  catch (err) {

    throw new Error(err.message);

  }

}

/*=========================================================
EQUIPMENT COUNT
=========================================================*/

function equipmentCount() {

  return getEquipment().length;

}

/*=========================================================
GET EQUIPMENT
=========================================================*/

function getEquipmentByID(id) {

  const equipment = getEquipment();

  const item = equipment.find(function(record){

    return text(record["Equipment ID"]) === text(id);

  });

  return item || null;

}
/*=========================================================
SAVE EQUIPMENT
=========================================================*/

function saveEquipment(data) {

  try {

    data = validateEquipment(data);

    appendSheet(

      SHEETS.EQUIPMENT,

      data

    );

    return success(

      "Equipment successfully added."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
VALIDATE EQUIPMENT
=========================================================*/

function validateEquipment(data) {

  if (!text(data["Equipment ID"])) {

    data["Equipment ID"] =

      generateEquipmentID();

  }

  if (!text(data["Equipment Name"])) {

    throw new Error(

      "Equipment Name is required."

    );

  }

  if (!text(data["Category"])) {

    throw new Error(

      "Category is required."

    );

  }

  data["Quantity"] =

    number(data["Quantity"]);

  data["Available"] =

    number(data["Available"]);

  if (!text(data["Condition"])) {

    data["Condition"] =

      "GOOD";

  }

  if (!text(data["Date Acquired"])) {

    data["Date Acquired"] =

      today();

  }

  return data;

}
/*=========================================================
UPDATE EQUIPMENT
=========================================================*/

function updateEquipment(data) {

  try {

    data = validateEquipment(data);

    const row = findRow(

      SHEETS.EQUIPMENT,

      "Equipment ID",

      data["Equipment ID"]

    );

    if (row < 2) {

      return failed(

        "Equipment not found."

      );

    }

    updateSheet(

      SHEETS.EQUIPMENT,

      row,

      data

    );

    return success(

      "Equipment successfully updated."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
DELETE EQUIPMENT
=========================================================*/

function deleteEquipment(id) {

  try {

    const row = findRow(

      SHEETS.EQUIPMENT,

      "Equipment ID",

      id

    );

    if (row < 2) {

      return failed(

        "Equipment not found."

      );

    }

    deleteSheetRow(

      SHEETS.EQUIPMENT,

      row

    );

    return success(

      "Equipment successfully deleted."

    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
SEARCH EQUIPMENT
=========================================================*/

function searchEquipment(keyword) {

  keyword = text(keyword).toLowerCase();

  return getEquipment().filter(function(item){

    return Object.values(item)

      .join(" ")

      .toLowerCase()

      .includes(keyword);

  });

}
