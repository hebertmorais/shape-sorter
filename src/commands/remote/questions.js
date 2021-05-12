export const defaultQuestions = () => {
  return [
    {
      type: "text",
      name: "mf-module-name",
      message: "What's the name of the module you're adding?",
      validate: (name) => (name === "" ? "The name cannot be empty!" : true),
    },
    {
      type: "text",
      name: "mf-module-use-name",
      message:
        "What's the name you would like to use? (Enter to use the default name)",
    },
    {
      type: "text",
      name: "mf-component-name",
      message:
        "What's the name of the component you'd like to import? (eg: Main)",
      validate: (name) => (name === "" ? "The name cannot be empty!" : true),
    },
    {
      type: "text",
      name: "mf-module-address",
      message: "What's the address that you module is running?",
    },
  ];
};

export default defaultQuestions;
