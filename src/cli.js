import runCreate from "../src/commands/create";
import runAddRemote from "../src/commands/remote";

export const cli = async ([, , ...args]) => {
  const command = args[0];
  const [, ...params] = args;

  if (command === "create") {
    await runCreate(params);
  }
  if (command === "remote") {
    await runAddRemote(params);
  }
};
