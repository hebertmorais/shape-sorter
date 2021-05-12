export const defaultQuestions = [
  {
    type: "text",
    name: "mf-name",
    message: "What is the name of your micro frontend?",
    validate: (name) =>
      name === "" ? "The micro frontend name cannot be empty!" : true,
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
    type: "text",
    name: "mf-port",
    message: "Which port would you like to run your project?",
  },
];

export default defaultQuestions;
