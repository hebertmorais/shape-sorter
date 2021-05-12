export const defaultQuestions = (dependencies) => {
  return [
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

const allQuestions = [
  defaultQuestions,
  isDependencyEagerQuestion,
  isDependencySingletonQuestion,
];

export default allQuestions;
