import {
  unzipToDirectory,
  openFile,
  getFolderDirectoryPath,
  addFileToDirectory,
  getSafeFileNameFromString,
  writeDataInFile,
} from "../utils/file";
import { parse } from "node-html-parser";

export const currentDir = process.cwd();
const reactHostTemplateZipPath = "../../templates/reactHost.zip";
const reactModuleTemplateZipPath = "../../templates/reactModule.zip";
const remoteTemplatePath = "../../templates/remote.txt";

export const copyReactTemplate = (type) => {
  const reactZipTemplatePath =
    type == "host" ? reactHostTemplateZipPath : reactModuleTemplateZipPath;
  unzipToDirectory(reactZipTemplatePath, currentDir);
};

export const createRemoteTemplate = (remoteName, moduleName) => {
  let templateContent = openFile(getFolderDirectoryPath(remoteTemplatePath), {
    encoding: "utf8",
    flag: "r",
  });
  templateContent = templateContent
    .replace(/{{componentName}}/g, `${moduleName}RemoteComponent`)
    .replace(/{{moduleImport}}/g, `${remoteName}/${moduleName}`)
    .replace(/{{moduleName}}/g, `${remoteName}${moduleName}RemoteComponent`);

  const remoteTemplateDestDir = `${currentDir}/src/remotes`;
  const fileName = getSafeFileNameFromString(`${remoteName}/${moduleName}`);
  const fileExtension = "js";
  addFileToDirectory(
    remoteTemplateDestDir,
    `${fileName}.${fileExtension}`,
    templateContent
  );
};

export const addRemoteAddressToIndex = (address) => {
  const indexPath = `${currentDir}/src/index.html`;
  let indexHtmlContent = openFile(indexPath, {
    encoding: "utf8",
    flag: "r",
  });

  const remoteLocation = `${address}/remoteEntry.js`;
  const remoteScript = `<script src="${remoteLocation}"></script>\n`;

  if (!indexHtmlContent.includes(remoteLocation)) {
    const root = parse(indexHtmlContent);
    const scriptAsHtmlNode = parse(remoteScript);
    const head = root.querySelector("head");
    head.appendChild(scriptAsHtmlNode);
    indexHtmlContent = root.toString();
  }
  writeDataInFile(indexPath, indexHtmlContent);
};
