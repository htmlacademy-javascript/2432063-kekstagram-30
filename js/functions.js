const calculateTimeInMinutes = (time) => time.split(':')[0] * 60 + Number(time.split(':')[1]);

const showTime = (beginingWorkDay, endWorkDay, startMeeting, meetingInMinutes) => {

  const beginingWorkDayMinutes = calculateTimeInMinutes(beginingWorkDay);
  const endWorkDayMinutes = calculateTimeInMinutes(endWorkDay);
  const startMeetingMinutes = calculateTimeInMinutes(startMeeting);

  if (endWorkDayMinutes - startMeetingMinutes >= meetingInMinutes && beginingWorkDayMinutes <= startMeetingMinutes) {
    return true;
  } else {
    return false;
  }
} ;


const timeValue = showTime ('14:00', '17:30', '14:00', 90);
console.log(timeValue);
