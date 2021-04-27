import runCreate from "../src/commands/create";

export function cli([, , ...args]) {
  const command = args[0];
  const [, ...params] = args;

  if (command === "create") {
    runCreate();
  }
}
