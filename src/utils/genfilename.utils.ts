const generateUniqueFilename = (type: string): string => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const time = date.getTime();
  switch (type) {
    case "avatar":
      type = "AVT";
    case "diagrams":
      type = "DIA";
    case "blogposts":
      type = "BLO";
    case "chats":
      type = "IMG";
    case "logo":
      type = "LOG";
    default:
      type = "";
  }
  const fullDay = day >= 10 ? day : "0" + `${day}`;
  const fullMonth = month >= 10 ? month : "0" + `${month}`;
  const genDate = `${type}-${year}${fullMonth}${fullDay}-${time}.jpg`;

  return genDate;
};

export default generateUniqueFilename;
