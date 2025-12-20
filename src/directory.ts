type Project = {
  name: string;
  link?: string;
  source: string;
};

interface Directory {
  projects: Record<string, Project>;
  "side-projects": Record<string, Project>;
  "archived-projects": Record<string, Project>;
  contact: Record<string, { name: string; link: string; linkName: string }>;
}

export const directory: Directory = {
  contact: {
    email: {
      name: "Email",
      link: "mailto:contact@zerolimits.dev",
      linkName: "contact@zerolimits.dev",
    },
    codeberg: {
      name: "Codeberg",
      link: "https://codeberg.org/noClaps",
      linkName: "noClaps",
    },
    github: {
      name: "GitHub",
      link: "https://github.com/noClaps",
      linkName: "noClaps",
    },
  },
  projects: {
    gallery: {
      name: "Aperturic Focus",
      link: "https://gallery.zerolimits.dev",
      source: "https://codeberg.org/noClaps/gallery",
    },
    nc: {
      name: "NC",
      link: "https://nclang.org",
      source: "https://codeberg.org/nclang",
    },
    blog: {
      name: "The Blog of Random",
      link: "https://blog.zerolimits.dev",
      source: "https://codeberg.org/noClaps/blog",
    },
    homepage: {
      name: "ZeroLimits.dev",
      link: "https://zerolimits.dev",
      source: "https://codeberg.org/noClaps/homepage",
    },
    znak: {
      name: "Znak",
      link: "https://znak.zerolimits.dev",
      source: "https://codeberg.org/noClaps/znak",
    },
  },
  "side-projects": {
    catbot: {
      name: "CatBot",
      link: "https://discord.com/oauth2/authorize?client_id=1271901024910839959",
      source: "https://codeberg.org/noClaps/catbot",
    },
    life: {
      name: "Conway's Game of Life",
      link: "https://life.zerolimits.dev",
      source: "https://codeberg.org/noClaps/game-of-life",
    },
    nbody: {
      name: "N-body Simulation",
      link: "https://nbody.zerolimits.dev",
      source: "https://codeberg.org/noClaps/nbody",
    },
    news: {
      name: "News",
      link: "https://news.zerolimits.dev",
      source: "https://codeberg.org/noClaps/news",
    },
    qcsim: {
      name: "QCSim",
      source: "https://codeberg.org/noClaps/qcsim",
    },
  },
  "archived-projects": {
    applause: {
      name: "Applause",
      source: "https://codeberg.org/noClaps/applause",
    },
    color: {
      name: "color",
      source: "https://codeberg.org/noClaps/color",
    },
    dot: {
      name: "dot",
      source: "https://codeberg.org/noClaps/dot",
    },
  },
};
