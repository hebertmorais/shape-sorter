import prompts from "prompts";
import {
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
  isDependencyVersionDifferentQuestion,
} from "./questions";
import { writeDataInFile } from "../../utils/file";
import { copyReactTemplate } from "../../utils/templates";

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
  mfType,
  mfPort,
  mfBuiltSharedDependencies,
}) => {
  return {
    name: mfName,
    remotes: {},
    exposes: {},
    type: mfType,
    port: mfPort,
    shared: mfBuiltSharedDependencies,
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
  });
  return depObj;
};

copyReactTemplate();
const pck = require(`${process.cwd()}/package.json`);
const dependencies = pck.dependencies;
const dependenciesKeys = Object.keys(dependencies);

const runCreate = async () => {
  const answers = await prompts(defaultQuestions(dependenciesKeys));
  const mfName = answers["mf-name"];
  const mfType = answers["mf-type"];
  const mfPort = answers["mf-port"];
  const mfSharedDependencies = answers["mf-shared-dependencies"];
  const mfDependenciesOpts = await prompts(
    makeDependenciesQuestions(dependencies, mfSharedDependencies)
  );

  const mfBuiltSharedDependencies = buildSharedDependencies(
    mfSharedDependencies,
    mfDependenciesOpts
  );

  const shapeSorter = buildShapeSorterConfig({
    mfName,
    mfType,
    mfPort,
    mfBuiltSharedDependencies,
  });

  const configPath = `${process.cwd()}/.shapesorterrc.json`;
  const data = JSON.stringify(shapeSorter);

  writeDataInFile(configPath, data);
  console.log("Configuração criada com sucesso");
};

export default runCreate;
