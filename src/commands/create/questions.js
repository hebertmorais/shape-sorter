export const defaultQuestions = (dependencies) => {
  return [
    {
      type: "text",
      name: "mf-name",
      message: "What is the name of your micro frontend?",
      validate: (name) =>
        name === "" ? "The micro frontend name cannot be empty!" : true,
    },
    {
      type: "text",
      name: "mf-file-name",
      message:
        "What is the name the remote file to be created? (Enter to remoteEntry.js)",
    },
    {
      type: "select",
      name: "mf-type",
      message: "What is the type of your micro frontend?",
      choices: [
        {
          title: "Host (Shell)",
          value: "host",
        },
        {
          title: "Module",
          value: "module",
        },
      ],
    },
    {
      type: "select",
      name: "mf-language",
      message: "Which programming language you use in your project?",
      choices: [
        {
          title: "Javascript Vanilla",
          value: "js",
        },
        {
          title: "Typescript",
          value: "ts",
        },
      ],
    },
    {
      type: "multiselect",
      name: "mf-shared-dependencies",
      message:
        "Which dependencies would you like to share between your micro frontends?",
      choices: dependencies.map((dependency) => {
        return { title: dependency, value: dependency };
      }),
      instructions: "\n- Space to select. Enter to submit",
    },
  ];
};

export const webpackVersionBelow5Question = {
  type: "select",
  name: "mf-webpack-version",
  message:
    "Your webpack version is below 5, which is the minimum required, what would you like to do?",
  choices: [
    {
      title: "Update to the latest version",
      value: "update",
    },
    {
      title: "Continue anyway (not recommended)",
      value: "continue",
    },
    {
      title: "Quit",
      value: "quit",
    },
  ],
};

export const webpackNotFoundQuestion = {
  type: "select",
  name: "mf-webpack-version",
  message:
    "Webpack config file not found. Would you like to install and continue",
  choices: [
    {
      title: "Yes, install and proceed.",
      value: "proceed",
    },
    {
      title: "No, abort and quit",
      value: "abort",
    },
  ],
};

export const isDependencySingletonQuestion = (dependency) => {
  return {
    type: "select",
    name: `is-singleton-${dependency}`,
    message: `The dependency ${dependency} is a singleton?`,
    choices: [
      {
        title: "Yes",
        value: "yes",
      },
      {
        title: "No",
        value: "no",
      },
    ],
  };
};

export const isDependencyEagerQuestion = (dependency) => {
  return {
    type: "select",
    name: `is-eager-${dependency}`,
    message: `The dependency ${dependency} is a eager?`,
    choices: [
      {
        title: "Yes",
        value: "yes",
      },
      {
        title: "No",
        value: "no",
      },
    ],
  };
};

export const isDependencyVersionDifferentQuestion = (
  dependency,
  dependencyVersion
) => {
  return {
    type: "text",
    name: `is-different-version-${dependency}`,
    message: `The version of ${dependency} is different from ${dependencyVersion}? (If yes insert the version, if no press Enter)`,
  };
};

export const modulesFederationExistsQuestion = {
  type: "text",
  name: "mf-webpack-federation",
  message:
    "The modules federation plugin has already been added, would you like to overwrite it? Y/N (Enter for no)",
};

const allQuestions = [
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
  isDependencyVersionDifferentQuestion,
  modulesFederationExistsQuestion,
  webpackNotFoundQuestion,
  webpackVersionBelow5Question,
];

export default allQuestions;
