import {
  unzipToDirectory,
  openFile,
  getFolderDirectoryPath,
  addFileToDirectory,
  getSafeFileNameFromString,
} from "../utils/file";

const currentDir = process.cwd();
const reactTemplateZipPath = "../../templates/react.zip";
const remoteTemplatePath = "../../templates/remote.txt";

export const copyReactTemplate = () => {
  unzipToDirectory(reactTemplateZipPath, currentDir);
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
