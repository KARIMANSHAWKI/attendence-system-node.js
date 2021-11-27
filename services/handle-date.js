const withoutDateAndFormatTime = (req, res) => {
  var time = new Date();
  let minutes = time.getMinutes();
  let hour = time.getHours();

  return `${minutes}:${hour}:00`;
};

function WithoutTime(dateTime) {
  var date =
    dateTime.getFullYear() +
    "/" +
    (dateTime.getMonth() + 1) +
    "/" +
    dateTime.getDate();

  return date;
}

module.exports = { withoutDateAndFormatTime, WithoutTime };
