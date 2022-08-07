import moment from "moment-timezone";
import formatTime from "./formatTime";

const setTimeZone = () => {
  var jun = moment(Date.now());
  let formatedDate = jun.tz("America/Toronto").format().split("T")[1];

  let expectedTime = formatedDate.split("-")[0];
  return expectedTime;
};

export default setTimeZone;
