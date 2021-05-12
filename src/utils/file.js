import fs from "fs";
import * as path from "path";
import AdmZip from "adm-zip";

export const unzipToDirectory = (srcZip, destFolder) => {
  const zipPath = `${path.join(__dirname, srcZip)}`;
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(destFolder, true);
};

export const openFile = (path) => {
  return fs.readFileSync(path);
};

export const writeDataInFile = (path, data) => {
  return fs.writeFileSync(path, data);
};
