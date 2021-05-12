import prompts from "prompts";
import defaultQuestions from "./questions";
import fs from "fs";
import {
  createRemoteTemplate,
  addRemoteAddressToIndex,
} from "../../utils/templates";
const runAddRemote = async () => {
  const answers = await prompts(defaultQuestions());
  const mfModuleName = answers["mf-module-name"];
  const mfModuleUseName = answers["mf-module-use-name"] || mfModuleName;
  const mfRunningAddress = answers["mf-module-address"];
  const mfComponentName = answers["mf-component-name"];
  try {
    let rawConfig = fs.readFileSync(".shapesorterrc.json");
    let shapesorterConfig = JSON.parse(rawConfig);
    shapesorterConfig.remotes[mfModuleUseName] = mfModuleName;
    fs.writeFileSync(
      `${process.cwd()}/.shapesorterrc.json`,
      JSON.stringify(shapesorterConfig, null, 4)
    );
    createRemoteTemplate(mfModuleUseName, mfComponentName);
    addRemoteAddressToIndex(mfRunningAddress);
    console.log(
      `Remote ${mfModuleName}/${mfComponentName} created successfully!`
    );
  } catch (error) {
    console.error(error);
  }
};
export default runAddRemote;
