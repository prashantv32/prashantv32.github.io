export interface SiteConfig {

  siteUrl: string;


  name: string;


  tagline: string;


  homeIntro: string;


  about: {

    intro: string;



    
  };

  // External contact and social links
  links: {

    github: string;


    linkedin: string;


    email: string;

    x : string;
  };
}

export const siteConfig: SiteConfig = {

  siteUrl: 'https://TODO-your-site-url.com',


  name: 'Prashant Verma',


  tagline: 'Full stack Developer',

  // needs good intro - should feel like me
  homeIntro:
    "I write about whatever I’m excited about: software development, AI experiments, social media, and everything in between.",

  about: {

    intro:
      "Hi, I'm Prashant Verma, a full-stack developer who learns by building. I pick a project, learn whatever it demands, ship it, and move on to the next one, each a bit harder than the last. ",
    
    
  },

  links: {

    github: 'https://github.com/prashantv32',


    linkedin: 'https://linkedin.com/in/prashantv23',


    email: 'mailto:prashantverma2254@gmail.com',

    x:'https://x.com/Prast006'
  },
};
