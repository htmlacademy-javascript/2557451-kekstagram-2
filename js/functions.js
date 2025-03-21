const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const SEQUENCE_NUMBER_START_WORK = 0;
const SEQUENCE_NUMBER_END_WORK = 1;
const SEQUENCE_NUMBER_START_MEET = 2;
const SEQUENCE_NUMBER_DURATION_MEETING = 3;

const getValuesTimes = (startWork, endWork, startMeet, durationMeeting) => {
  const massiveGetTimesValues = [startWork, endWork, startMeet];
  const dataTimesResult = [];

  for (let i = 0; i < massiveGetTimesValues.length; i++) {
    let valuesTime = massiveGetTimesValues[i].split(":").map(Number);
    const convertTimeStartWorkHoursInSeconds = valuesTime[0] * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
    const convertTimeStartWorkTimesInSeconds = valuesTime[1] * SECONDS_IN_MINUTE;
    const convertResult = convertTimeStartWorkHoursInSeconds + convertTimeStartWorkTimesInSeconds;
    dataTimesResult.push(convertResult);
  }

  dataTimesResult.push(durationMeeting * SECONDS_IN_MINUTE);

  if (
    dataTimesResult[SEQUENCE_NUMBER_END_WORK] > dataTimesResult[SEQUENCE_NUMBER_START_WORK] &&
    dataTimesResult[SEQUENCE_NUMBER_START_MEET] >= dataTimesResult[SEQUENCE_NUMBER_START_WORK] &&
    (dataTimesResult[SEQUENCE_NUMBER_START_MEET] + dataTimesResult[SEQUENCE_NUMBER_DURATION_MEETING]) <= dataTimesResult[SEQUENCE_NUMBER_END_WORK]
  ){
    return true;
  } else {
    return false;
  }

};

console.log(getValuesTimes('08:00', '17:30', '14:00', 90));
console.log(getValuesTimes('8:0', '10:0', '8:0', 120));
console.log(getValuesTimes('08:00', '14:30', '14:00', 90));
console.log(getValuesTimes('14:00', '17:30', '08:0', 90));
console.log(getValuesTimes('8:00', '17:30', '08:00', 900));

