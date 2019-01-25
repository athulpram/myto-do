const parseArgs = function (postedData) {
    let data = postedData.split("&");
    let parsedData = {};
    data.forEach(keyVal => {
        [key, val] = keyVal.split("=");
        parsedData[key] = val;
    });
    return parsedData;
};

module.exports = {
    parseArgs
};