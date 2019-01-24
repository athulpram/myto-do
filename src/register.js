const parsePostedData = function (postedData) {
  let data = postedData.split("&");
  let parsedData = {};
  data.forEach((keyVal) => {
    [key, val] = keyVal.split("=");
    parsedData[key] = val;
  });
  return parsedData;
}

const handleSignup = function (storeUserDetails, cachedData, req, res) {
  const userDetails = parsePostedData(req.body);
  const username = userDetails.username;
  const usersData = cachedData.users;
  usersData[username] = userDetails;
  storeUserDetails(JSON.stringify(usersData));
  res.end();
}

module.exports = {
  handleSignup
}