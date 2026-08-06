/******************************************************************
 CAMANSIHAN FARMERS ASSOCIATION PORTAL
 Members.gs
******************************************************************/

/*=========================================================
GET ALL MEMBERS
=========================================================*/

function getMembers() {

  const members = readSheet(SHEETS.MEMBERS);

  return members.map(function(member){

    return JSON.parse(JSON.stringify(member));

  });

}

/*=========================================================
MEMBER COUNT
=========================================================*/

function memberCount() {

  return readSheet(
    SHEETS.MEMBERS
  ).length;

}

/*=========================================================
GET MEMBER BY ID
=========================================================*/

function getMember(id) {

  Logger.log("Requested ID: [" + id + "]");

  const members = readSheet(SHEETS.MEMBERS);

  for (let i = 0; i < members.length; i++) {

    Logger.log(
      "Checking: [" +
      members[i]["Member ID"] +
      "]"
    );

    if (String(members[i]["Member ID"]).trim() === String(id).trim()) {

      Logger.log("MATCH FOUND");

      return members[i];

    }

  }

  Logger.log("NO MATCH FOUND");

  return null;

}

/*=========================================================
SAVE MEMBER
=========================================================*/

function saveMember(member) {

  try {

    /*-------------------------------------
      CHECK DUPLICATE MEMBER ID
    -------------------------------------*/

    if (

      memberExists(

        member["Member ID"]

      )

    ) {

      return failed(

        "Member ID already exists."

      );

    }

    member = validateMember(member);

    appendSheet(

      SHEETS.MEMBERS,

      member

    );

    return success(

      "Member successfully added."

    );

  }

  catch (err) {

    return failed(

      err.message

    );

  }

}

/*=========================================================
VALIDATE MEMBER
=========================================================*/

function validateMember(member) {

  if (!text(member["Member ID"])) {

    throw new Error(
      "Member ID is required."
    );

  }

  if (!text(member["First Name"])) {

    throw new Error(
      "First Name is required."
    );

  }

  if (!text(member["Last Name"])) {

    throw new Error(
      "Last Name is required."
    );

  }

// Sex is optional

// Birthdate is optional
if (text(member["Birthdate"])) {

  member["Age"] = calculateAge(
    member["Birthdate"]
  );

} else {

  member["Age"] = "";

}

  if (!text(member["Status"])) {

    member["Status"] = "ACTIVE";

  }

  if (!text(member["Date Joined"])) {

    member["Date Joined"] =
      today();

  }

  if (!text(member["Created At"])) {

    member["Created At"] =
      now();

  }

  member["Updated At"] =
    now();

  return member;

}

/*=========================================================
CALCULATE AGE
=========================================================*/

function calculateAge(birthdate) {

  if (!birthdate) return "";

  const birth =
    new Date(birthdate);

  const todayDate =
    new Date();

  let age =
    todayDate.getFullYear() -
    birth.getFullYear();

  const month =
    todayDate.getMonth() -
    birth.getMonth();

  if (

    month < 0 ||

    (

      month === 0 &&

      todayDate.getDate() <
      birth.getDate()

    )

  ) {

    age--;

  }

  return age;

}
/*=========================================================
UPDATE MEMBER
=========================================================*/

function updateMember(member) {

  try {

    member = validateMember(member);

    const row = findRow(
      SHEETS.MEMBERS,
      "Member ID",
      member["Member ID"]
    );

    if (row < 2) {

      return failed(
        "Member not found."
      );

    }

    const sh = sheet(SHEETS.MEMBERS);

    member["Created At"] =
      sh.getRange(row, 17).getValue();

    member["Updated At"] =
      now();

    updateSheet(
      SHEETS.MEMBERS,
      row,
      member
    );

    return success(
      "Member successfully updated."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
DELETE MEMBER
=========================================================*/

function deleteMember(memberID) {

  try {

    const row = findRow(
      SHEETS.MEMBERS,
      "Member ID",
      memberID
    );

    if (row < 2) {

      return failed(
        "Member not found."
      );

    }

    deleteSheetRow(
      SHEETS.MEMBERS,
      row
    );

    return success(
      "Member successfully deleted."
    );

  }

  catch (err) {

    return failed(err.message);

  }

}

/*=========================================================
MEMBER EXISTS
=========================================================*/

function memberExists(memberID) {

  return findRow(
    SHEETS.MEMBERS,
    "Member ID",
    memberID
  ) > 1;

}

/*=========================================================
SEARCH MEMBERS
=========================================================*/

function searchMembers(keyword) {

  keyword = text(keyword).toLowerCase();

  const members = getMembers();

  return members.filter(function(member) {

    return Object.values(member)
      .join(" ")
      .toLowerCase()
      .includes(keyword);

  });

}
