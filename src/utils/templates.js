import { unzipToDirectory } from "../utils/file";

const currentDir = process.cwd();
const reactTemplateZipPath = "../../templates/react.zip";

export const copyReactTemplate = () => {
  unzipToDirectory(reactTemplateZipPath, currentDir);
};
