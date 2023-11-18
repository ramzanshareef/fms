const moment = require("moment");
function myDateTime(dateTimeString) {
    const transformedDateTime = moment(dateTimeString).format("DD-MM-YY hh:mm A");
    return transformedDateTime;
}

module.exports = myDateTime;