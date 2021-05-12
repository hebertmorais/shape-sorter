export const defaultQuestions = [
  {
    type: "text",
    name: "mf-expose-name",
    message: "What is the name of the component you're exposing?",
    validate: (name) => (name === "" ? "The name cannot be empty!" : true),
  },
  {
    type: "text",
    name: "mf-expose-path",
    message: "What is the path of the component you're exposing from the root?",
    validate: (path) => (path === "" ? "The path cannot be empty!" : true),
  },
];

export default defaultQuestions;
