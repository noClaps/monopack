import { directory } from "../directory.ts";

export function ls(args: string[]) {
  if (args.length > 2)
    return `Incorrect usage of the ls command. Use "help ls" to see how to use this command.`;

  let showKeys = false;
  let arg = "";

  if (args.length === 2) {
    if (args[0] === "--keys") {
      showKeys = true;
      if (["projects", "contact"].includes(args[1])) arg = args[1];
    }

    if (
      ["contact", "projects", "side-projects", "archived-projects"].includes(
        args[0],
      )
    ) {
      arg = args[0];
      if (args[1] === "--keys") showKeys = true;
    }
  } else {
    if (args[0] === "--keys") showKeys = true;
    if (
      ["contact", "projects", "side-projects", "archived-projects"].includes(
        args[0],
      )
    )
      arg = args[0];
  }

  let contactList = "";
  Object.keys(directory.contact).forEach((key, i) => {
    const contact = directory.contact[key];
    contactList += `${i === Object.keys(directory.contact).length - 1 ? "└" : "├"}── ${contact.name} - <a href="${contact.link}">${contact.linkName}</a>${showKeys ? ` (${key})` : ""}\n`;
  });
  contactList = contactList.trim();

  let projectsList = "";
  Object.keys(directory.projects).forEach((key, i) => {
    const project = directory.projects[key];
    projectsList += `${i === Object.keys(directory.projects).length - 1 ? "└" : "├"}── ${project.name} - ${project.link ? `<a href="${project.link}">Link</a> - ` : ""}<a href="${project.source}">Source</a>${showKeys ? ` (${key})` : ""}\n`;
  });
  projectsList = projectsList.trim();

  let sideProjectsList = "";
  Object.keys(directory["side-projects"]).forEach((key, i) => {
    const sideProject = directory["side-projects"][key];
    sideProjectsList += `${i === Object.keys(directory["side-projects"]).length - 1 ? "└" : "├"}── ${sideProject.name} - ${sideProject.link ? `<a href="${sideProject.link}">Link</a> - ` : ""}<a href="${sideProject.source}">Source</a>${showKeys ? ` (${key})` : ""}\n`;
  });
  sideProjectsList = sideProjectsList.trim();

  let archivedProjectsList = "";
  Object.keys(directory["archived-projects"]).forEach((key, i) => {
    const sideProject = directory["archived-projects"][key];
    archivedProjectsList += `${i === Object.keys(directory["archived-projects"]).length - 1 ? "└" : "├"}── ${sideProject.name} - ${sideProject.link ? `<a href="${sideProject.link}">Link</a> - ` : ""}<a href="${sideProject.source}">Source</a>${showKeys ? ` (${key})` : ""}\n`;
  });
  archivedProjectsList = archivedProjectsList.trim();

  if (!arg) {
    return `
contact/
${contactList}
projects/
${projectsList}
side-projects/
${sideProjectsList}
archived-projects/
${archivedProjectsList}`.trim();
  }

  if (arg.match(/\/?contact\/?/)) {
    return `contact/\n${contactList}`;
  }

  if (arg.match(/\/?side-projects\/?/)) {
    return `side-projects/\n${sideProjectsList}`;
  }
  if (arg.match(/\/?archived-projects\/?/)) {
    return `archived-projects/\n${archivedProjectsList}`;
  }
  if (arg.match(/\/?projects\/?/)) {
    return `projects/\n${projectsList}`;
  }

  return `${arg}: Directory not found`;
}
