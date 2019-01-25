const publicFiles = {};
const User = require("./user");

const readFile = function(filePath, fs) {
  publicFiles[filePath] = fs.readFileSync(filePath, "utf-8");
};

const readData = function(directory, fs) {
  const files = getFiles(directory, fs).split(",");
  files.forEach(element => {
    readFile(element, fs);
  });
  return publicFiles;
};

const isDirectory = arg => !arg.includes(".");

const createFilePath = function(dir, fileName) {
  return dir + "/" + fileName;
};

const getFiles = function(directory, fs) {
  const files = fs.readdirSync(directory);
  const allFiles = files.map(file => {
    const filePath = createFilePath(directory, file);
    if (isDirectory(file)) {
      return getFiles(filePath, fs);
    }
    return filePath;
  });
  return allFiles.join(",");
};

const loadUsers = function(userData, fs) {
  const usersData = JSON.parse(fs.readFileSync(userData));
  const userInstances = {};
  Object.keys(usersData).forEach(username => {
    userInstances[username] = new User(usersData[username]);
  });
  return userInstances;
};

module.exports = { loadFiles: readData, loadUsers };
