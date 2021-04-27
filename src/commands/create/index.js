import prompts from "prompts";
import {
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
  isDependencyVersionDifferentQuestion,
} from "./questions";
import mockPackage from "../../mocks/package.json";

const dependencies = mockPackage.dependencies;
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

const runCreate = async () => {
  const answers = await prompts(defaultQuestions(dependenciesKeys));
  const mfName = answers["mf-name"];
  const mfFileName = answers["mf-file-name"];
  const mfType = answers["mf-type"];
  const mfLanguage = answers["mf-language"];
  const mfSharedDependencies = answers["mf-shared-dependencies"];
  const versionAnswers = await prompts(
    makeDependenciesQuestions(dependencies, mfSharedDependencies)
  );
  console.log(answers, versionAnswers);
};

export default runCreate;
