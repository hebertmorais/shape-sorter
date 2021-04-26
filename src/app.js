import prompts from "prompts";

const questions = [
  {
    type: "text",
    name: "username",
    message: "What is your name?",
  },
  {
    type: "number",
    name: "age",
    message: "How old are you?",
  },
  {
    type: "text",
    name: "about",
    message: "Tell something about yourself",
    initial: "Why should I?",
  },
];

(async () => {
  const { username, age, about } = await prompts(questions);
  console.log(
    `Your name is ${username}, you're ${age} and here's a little something about you: ${about}`
  );
})();
