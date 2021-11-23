const handleDate = (req, res) => {
    var time = new Date();
    let minutes = time.getMinutes();
    let hour = time.getHours();

    return `${minutes}:${hour}:00`;
}

module.exports = handleDate;