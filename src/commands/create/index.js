import prompts from "prompts";
import defaultQuestions from "./questions";
import { writeDataInFile } from "../../utils/file";
import { copyReactTemplate } from "../../utils/templates";

const buildShapeSorterConfig = ({ mfName, mfType, mfPort }) => {
  return {
    name: mfName,
    remotes: {},
    exposes: { "./Main": `./src/components/Main.js` },
    filename: "remoteEntry.js",
    type: mfType,
    port: mfPort,
    shared: {
      react: {
        singleton: true,
        eager: mfType == "host",
      },
      "react-dom": {
        singleton: true,
        eager: mfType == "host",
      },
    },
  };
};

const runCreate = async () => {
  const answers = await prompts(defaultQuestions);
  const mfName = answers["mf-name"];
  const mfType = answers["mf-type"];
  const mfPort = answers["mf-port"];

  const shapeSorter = buildShapeSorterConfig({
    mfName,
    mfType,
    mfPort,
  });

  const configPath = `${process.cwd()}/.shapesorterrc.json`;
  const data = JSON.stringify(shapeSorter, null, 4);
  copyReactTemplate(mfType);
  writeDataInFile(configPath, data);
  console.log("Configuração criada com sucesso");
};

export default runCreate;
