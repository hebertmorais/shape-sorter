import prompts from "prompts";
import defaultQuestions from "./questions";
import fs from "fs";

const runAddRemote = async () => {
  const answers = await prompts(defaultQuestions());
  const mfModuleName = answers["mf-module-name"];
  const mfModuleUseName = answers["mf-module-use-name"] || mfModuleName;
  const mfRunningAddress = answers["mf-module-address"];
  try {
    let rawConfig = fs.readFileSync(".shapesorterrc.json");
    let shapesorterConfig = JSON.parse(rawConfig);
    shapesorterConfig.remotes[
      mfModuleUseName
    ] = `${mfModuleName}@${mfRunningAddress}`;
    fs.writeFileSync(
      `${process.cwd()}/.shapesorterrc.json`,
      JSON.stringify(shapesorterConfig)
    );
  } catch (error) {
    console.error(error);
  }
};
export default runAddRemote;
