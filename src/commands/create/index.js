import prompts from "prompts";
import {
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
  isDependencyVersionDifferentQuestion,
} from "./questions";
import fs from "fs";
const pck = require(`${process.cwd()}/package.json`);

const dependencies = pck.dependencies;
const dependenciesKeys = Object.keys(dependencies);

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

  const sharedDependenciesVersionQuestions = [];
  mfSharedDependencies.map((sharedDependency) => {
    sharedDependenciesVersionQuestions.push(
      isDependencyVersionDifferentQuestion(
        sharedDependency,
        packageDependencies[sharedDependency]
      )
    );
  });
  const allDependenciesQuestions = [
    sharedDependenciesVersionQuestions,
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

const buildShapeSorterConfig = ({
  mfName,
  mfFileName,
  mfType,
  mfLanguage,
  mfDependenciesOpts,
}) => {
  return {
    name: mfName,
    filename: mfFileName,
    remotes: {},
    exposes: {},
    type: mfType,
    language: mfLanguage,
    shared: mfDependenciesOpts,
  };
};

const buildSharedDependencies = (mfDependencies, mfDependenciesOpts) => {
  let depObj = {};
  mfDependencies.map((dependency) => {
    depObj[dependency] = {
      singleton:
        mfDependenciesOpts[`is-singleton-${dependency}`] !== "" || false,
      eager: mfDependenciesOpts[`is-eager-${dependency}`] !== "" || false,
      requiredVersion:
        mfDependenciesOpts[`is-different-version-${dependency}`] ||
        dependencies[dependency],
    };
    console.log(depObj);
  });
  return depObj;
};

const runCreate = async () => {
  const answers = await prompts(defaultQuestions(dependenciesKeys));
  const mfName = answers["mf-name"];
  const mfFileName = answers["mf-file-name"] || "remoteEntry.js";
  const mfType = answers["mf-type"];
  const mfLanguage = answers["mf-language"];
  const mfSharedDependencies = answers["mf-shared-dependencies"];
  const mfDependenciesOpts = await prompts(
    makeDependenciesQuestions(dependencies, mfSharedDependencies)
  );

  const builtSharedDependencies = buildSharedDependencies(
    mfSharedDependencies,
    mfDependenciesOpts
  );
  const shapeSorter = buildShapeSorterConfig({
    mfName,
    mfFileName,
    mfType,
    mfLanguage,
    mfDependenciesOpts: builtSharedDependencies,
  });
  console.log(shapeSorter);
  fs.writeFileSync(
    `${process.cwd()}/.shapesorterrc.json`,
    JSON.stringify(shapeSorter)
  );
};

export default runCreate;
