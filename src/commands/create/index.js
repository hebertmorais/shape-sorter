import prompts from "prompts";
import { defaultQuestions } from "./questions";

(async () => {
  const answers = await prompts(defaultQuestions);
  console.log(answers);
})();
