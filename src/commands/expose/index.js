import defaultQuestions from "./questions";
import prompts from "prompts";
import { writeDataInFile, openFile } from "../../utils/file";
const runExpose = async () => {
  const answers = await prompts(defaultQuestions);
  const mfExposeName = answers["mf-expose-name"];
  const mfExposePath = answers["mf-expose-path"];
  try {
    let rawConfig = openFile(".shapesorterrc.json");
    let shapesorterConfig = JSON.parse(rawConfig);
    shapesorterConfig.exposes[`./${mfExposeName}`] = mfExposePath;
    writeDataInFile(
      `${process.cwd()}/.shapesorterrc.json`,
      JSON.stringify(shapesorterConfig, null, 4)
    );
    console.log(`Exposing ${mfExposeName} successfully!`);
  } catch (error) {
    console.error(error);
  }
};

export default runExpose;
