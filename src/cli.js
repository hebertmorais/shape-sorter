import runCreate from "../src/commands/create";
import runAddRemote from "../src/commands/remote";
import runExpose from "../src/commands/expose";
import runDependency from "../src/commands/dependency";

export const cli = async ([, , ...args]) => {
  const command = args[0];
  const [, ...params] = args;

  if (command === "create") {
    await runCreate(params);
  }

  if (command === "remote") {
    await runAddRemote(params);
  }

  if (command === "expose") {
    await runExpose(params);
  }

  if (command === "dependency") {
    await runDependency(params);
  }
};
