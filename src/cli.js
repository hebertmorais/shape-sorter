import runCreate from "../src/commands/create";

export const cli = async ([, , ...args]) => {
  const command = args[0];
  const [, ...params] = args;

  if (command === "create") {
    await runCreate(params);
  }
};
