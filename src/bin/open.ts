import { directory } from "../directory.ts";

export function open(args: string[]) {
  if (args.length < 1 || args.length > 2)
    return `Incorrect usage of the open command. Use "help open" to see how to use this command.`;

  let key = "";
  let openSource = false;

  if (args.length === 2) {
    if (args[0] === "--source") {
      openSource = true;
      key = args[1];
    }

    if (args[1] === "--source") {
      openSource = true;
      key = args[0];
    }

    if (args[0] !== "--source" && args[1] !== "--source") {
      return `Incorrect usage of the open command. Use "help open" to see how to use this command.`;
    }
  } else {
    key = args[0];
  }

  if (key in directory.projects) {
    if (openSource || !directory.projects[key].link) {
      window.open(directory.projects[key].source, "_blank");
      return "";
    }

    window.open(directory.projects[key].link!, "_blank");
    return "";
  }
  if (key in directory["side-projects"]) {
    if (openSource || !directory["side-projects"][key].link) {
      window.open(directory["side-projects"][key].source, "_blank");
      return "";
    }

    window.open(directory["side-projects"][key].link!, "_blank");
    return "";
  }
  if (key in directory["archived-projects"]) {
    if (openSource || !directory["archived-projects"][key].link) {
      window.open(directory["archived-projects"][key].source, "_blank");
      return "";
    }

    window.open(directory["archived-projects"][key].link!, "_blank");
    return "";
  }

  if (key in directory.contact) {
    if (openSource) {
      return "--source flag cannot be used with a contact key.";
    }

    window.open(directory.contact[key].link, "_blank");
    return "";
  }

  if (key === "--source")
    return `A key is needed. Use "help open" to see how to use this command.`;

  return `${key}: Unknown key. Use "ls --keys" to see available keys.`;
}
