import fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";

export const unzipToDirectory = (srcZip, destFolder) => {
  const zipPath = getFolderDirectoryPath(srcZip);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(destFolder, true);
};

export const openFile = (path, options = {}) => {
  return fs.readFileSync(path, options);
};

export const writeDataInFile = (path, data) => {
  return fs.writeFileSync(path, data);
};

export const addFileToDirectory = (dirPath, fileName, fileContent) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  writeDataInFile(`${dirPath}/${fileName}`, fileContent);
};

export const getFolderDirectoryPath = (directory) => {
  return `${path.join(__dirname, directory)}`;
};

export const getSafeFileNameFromString = (name) => {
  return name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};
