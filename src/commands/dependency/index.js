import {
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
} from "./questions";
import prompts from "prompts";
import { writeDataInFile, openFile } from "../../utils/file";

function makeDependenciesQuestions(packageDependencies, mfSharedDependencies) {
  const sharedDependenciesSingletonQuestions = [];
  mfSharedDependencies.map((sharedDependency) => {
    sharedDependenciesSingletonQuestions.push(
      isDependencySingletonQuestion(sharedDependency)
    );
  });

  const sharedDependenciesEagerQuestions = [];
  mfSharedDependencies.map((sharedDependency) => {
    sharedDependenciesEagerQuestions.push(
      isDependencyEagerQuestion(sharedDependency)
    );
  });

  const allDependenciesQuestions = [
    sharedDependenciesEagerQuestions,
    sharedDependenciesSingletonQuestions,
  ];

  //rotate matrix so it make all the questions about each dependency at a time
  const questionsRotatedMatrix = allDependenciesQuestions[0].map((_, index) =>
    allDependenciesQuestions.map((row) => row[index]).reverse()
  );

  //turning the 2d matrix into 1d array
  const dependenciesQuestionsRightOrder = [].concat(...questionsRotatedMatrix);

  return dependenciesQuestionsRightOrder;
}

const buildSharedDependencies = (mfDependencies, mfDependenciesOpts) => {
  let depObj = {};
  mfDependencies.map((dependency) => {
    depObj[dependency] = {
      singleton:
        mfDependenciesOpts[`is-singleton-${dependency}`] !== "" || false,
      eager: mfDependenciesOpts[`is-eager-${dependency}`] !== "" || false,
    };
  });
  return depObj;
};

const runDependency = async () => {
  const pck = require(`${process.cwd()}/package.json`);
  const dependencies = pck.dependencies;
  const dependenciesKeys = Object.keys(dependencies);

  let rawConfig = openFile(".shapesorterrc.json");
  let shapesorterConfig = JSON.parse(rawConfig);

  const existingDependencies = shapesorterConfig.shared;
  const existingDependenciesKeys = Object.keys(existingDependencies);
  const newDependenciesKeys = dependenciesKeys.filter(
    (item) => !existingDependenciesKeys.includes(item)
  );

  if (newDependenciesKeys.length == 0) {
    console.log("You've already added all dependencies!");
    return;
  }
  const answers = await prompts(defaultQuestions(newDependenciesKeys));
  const mfSharedDependencies = answers["mf-shared-dependencies"];
  const mfDependenciesOpts = await prompts(
    makeDependenciesQuestions(dependencies, mfSharedDependencies)
  );

  const mfBuiltSharedDependencies = buildSharedDependencies(
    mfSharedDependencies,
    mfDependenciesOpts
  );

  try {
    let rawConfig = openFile(".shapesorterrc.json");
    let shapesorterConfig = JSON.parse(rawConfig);
    shapesorterConfig.shared = {
      ...existingDependencies,
      ...mfBuiltSharedDependencies,
    };
    writeDataInFile(
      `${process.cwd()}/.shapesorterrc.json`,
      JSON.stringify(shapesorterConfig, null, 4)
    );
    console.log(`Added dependencies ${newDependenciesKeys} successfully!`);
  } catch (error) {
    console.error(error);
  }
};

export default runDependency;
