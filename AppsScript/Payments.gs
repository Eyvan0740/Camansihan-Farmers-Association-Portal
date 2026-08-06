/******************************************************************
 CAMANSIHAN FARMERS ASSOCIATION PORTAL
 Payments.gs
******************************************************************/

/*=========================================================
FERTILIZER
=========================================================*/

function getFertilizers() {

  try {

    return readSheet(
      SHEETS.FERTILIZER
    );

  }

  catch(err){

    throw new Error(err.message);

  }

}

/*=========================================================
SEEDS
=========================================================*/

function getSeeds() {

  try {

    return readSheet(
      SHEETS.SEEDS
    );

  }

  catch(err){

    throw new Error(err.message);

  }

}

/*=========================================================
HARVEST
=========================================================*/

function getHarvests() {

  try {

    return readSheet(
      SHEETS.HARVEST
    );

  }

  catch(err){

    throw new Error(err.message);

  }

}

/*=========================================================
COUNTS
=========================================================*/

function fertilizerCount(){

  return getFertilizers().length;

}

function seedCount(){

  return getSeeds().length;

}

function harvestCount(){

  return getHarvests().length;

}
/*=========================================================
SAVE FERTILIZER
=========================================================*/

function saveFertilizer(data){

  try{

    data = validateFertilizer(data);

    appendSheet(

      SHEETS.FERTILIZER,

      data

    );

    return success(

      "Fertilizer record added."

    );

  }

  catch(err){

    return failed(err.message);

  }

}

/*=========================================================
VALIDATE FERTILIZER
=========================================================*/

function validateFertilizer(data){

  if(

    !text(data["Fertilizer ID"])

  ){

    data["Fertilizer ID"] =

      generateFertilizerID();

  }

  if(

    !text(data["Member ID"])

  ){

    throw new Error(

      "Member ID is required."

    );

  }

  if(

    !text(data["Date"])

  ){

    data["Date"] =

      today();

  }

  if(

    !text(data["Status"])

  ){

    data["Status"] =

      "UNPAID";

  }

  return data;

}
/*=========================================================
UPDATE FERTILIZER
=========================================================*/

function updateFertilizer(data) {

  try {

    data = validateFertilizer(data);

    const row = findRow(

      SHEETS.FERTILIZER,

      "Fertilizer ID",

      data["Fertilizer ID"]

    );

    if (row < 2) {

      return failed(
        "Fertilizer record not found."
      );

    }

    updateSheet(

      SHEETS.FERTILIZER,

      row,

      data

    );

    return success(
      "Fertilizer record updated."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
DELETE FERTILIZER
=========================================================*/

function deleteFertilizer(id) {

  try {

    const row = findRow(

      SHEETS.FERTILIZER,

      "Fertilizer ID",

      id

    );

    if (row < 2) {

      return failed(
        "Fertilizer record not found."
      );

    }

    deleteSheetRow(

      SHEETS.FERTILIZER,

      row

    );

    return success(
      "Fertilizer record deleted."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
SEARCH FERTILIZER
=========================================================*/

function searchFertilizer(keyword) {

  keyword = text(keyword).toLowerCase();

  return getFertilizers().filter(function(item){

    return Object.values(item)

      .join(" ")

      .toLowerCase()

      .includes(keyword);

  });

}
/*=========================================================
SAVE SEEDS
=========================================================*/

function saveSeed(data) {

  try {

    data = validateSeed(data);

    appendSheet(

      SHEETS.SEEDS,

      data

    );

    return success(
      "Seed record added."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
VALIDATE SEEDS
=========================================================*/

function validateSeed(data) {

  if (!text(data["Seeds ID"])) {

    data["Seeds ID"] =

      generateSeedID();

  }

  if (!text(data["Member ID"])) {

    throw new Error(
      "Member ID is required."
    );

  }

  if (!text(data["Date"])) {

    data["Date"] = today();

  }

  if (!text(data["Status"])) {

    data["Status"] = "UNPAID";

  }

  return data;

}
/*=========================================================
UPDATE SEED
=========================================================*/

function updateSeed(data) {

  try {

    data = validateSeed(data);

    const row = findRow(

      SHEETS.SEEDS,

      "Seeds ID",

      data["Seeds ID"]

    );

    if (row < 2) {

      return failed(
        "Seed record not found."
      );

    }

    updateSheet(

      SHEETS.SEEDS,

      row,

      data

    );

    return success(
      "Seed record updated."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
DELETE SEED
=========================================================*/

function deleteSeed(seedID) {

  try {

    const row = findRow(

      SHEETS.SEEDS,

      "Seeds ID",

      seedID

    );

    if (row < 2) {

      return failed(
        "Seed record not found."
      );

    }

    deleteSheetRow(

      SHEETS.SEEDS,

      row

    );

    return success(
      "Seed record deleted."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
SEARCH SEEDS
=========================================================*/

function searchSeeds(keyword) {

  keyword = text(keyword).toLowerCase();

  return getSeeds().filter(function(item){

    return Object.values(item)

      .join(" ")

      .toLowerCase()

      .includes(keyword);

  });

}
/*=========================================================
SAVE HARVEST
=========================================================*/

function saveHarvest(data) {

  try {

    data = validateHarvest(data);

    appendSheet(

      SHEETS.HARVEST,

      data

    );

    return success(
      "Harvest record added."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
VALIDATE HARVEST
=========================================================*/

function validateHarvest(data) {

  if (!text(data["Harvest ID"])) {

    data["Harvest ID"] =

      generateHarvestID();

  }

  if (!text(data["Member ID"])) {

    throw new Error(
      "Member ID is required."
    );

  }

  if (!text(data["Date"])) {

    data["Date"] = today();

  }

  return data;

}

/*=========================================================
UPDATE HARVEST
=========================================================*/

function updateHarvest(data) {

  try {

    data = validateHarvest(data);

    const row = findRow(

      SHEETS.HARVEST,

      "Harvest ID",

      data["Harvest ID"]

    );

    if (row < 2) {

      return failed(
        "Harvest record not found."
      );

    }

    updateSheet(

      SHEETS.HARVEST,

      row,

      data

    );

    return success(
      "Harvest record updated."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
DELETE HARVEST
=========================================================*/

function deleteHarvest(harvestID) {

  try {

    const row = findRow(

      SHEETS.HARVEST,

      "Harvest ID",

      harvestID

    );

    if (row < 2) {

      return failed(
        "Harvest record not found."
      );

    }

    deleteSheetRow(

      SHEETS.HARVEST,

      row

    );

    return success(
      "Harvest record deleted."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
SEARCH HARVEST
=========================================================*/

function searchHarvest(keyword) {

  keyword = text(keyword).toLowerCase();

  return getHarvests().filter(function(item){

    return Object.values(item)

      .join(" ")

      .toLowerCase()

      .includes(keyword);

  });

}
