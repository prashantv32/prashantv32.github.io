export interface SiteConfig {

  siteUrl: string;


  name: string;


  tagline: string;


  homeIntro: string;


  about: {

    intro: string;

    currentFocus: string[];

    notesApiHighlights: string[];

    philosophy: string;
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


  tagline: 'Full stack Engineer',

  // needs good intro - should feel like me
  homeIntro:
    "tells i build full stack projects not learning , i learn by building something that should feel like me, what i believe or what i do(that difines you) ",

  about: {

    intro:
      "Hi, I'm Prashant Verma. I'm learning full-stack web development, mostly backend so far: Node.js, Express and TypeScript. I learn best by building something small, breaking it, and writing about the fix.",
    currentFocus: [
      'Node.js and Express backend development',
      'Strict TypeScript configuration and type-safe application architecture',
      'RESTful API design, authentication flows, and middleware pipelines',
    ],
    notesApiHighlights: [
      'Stateless authentication using JSON Web Tokens (JWT)',
      'Secure password hashing and salting with bcrypt',
      'Strict request validation and custom error handling middleware',
      'Type-safe service and repository layering in TypeScript',
    ],

    philosophy:
      "I believe in learning by doing: build the thing, hit the error, understand it, then write it down so the next beginner has an easier time.",
  },

  links: {

    github: 'https://github.com/prashantv32',


    linkedin: 'https://linkedin.com/in/prashantv23',


    email: 'mailto:prashantverma2254@gmail.com',

    x:'https://x.com/Prast006'
  },
};
