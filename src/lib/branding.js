import {config} from './config'

const BRANDING = {
  config,
  projectName: "DigiDeeds",
  superUserName: "digideeds",
  urls: {
    base: "digideeds.io",
    www: "www.digideeds.io",
    protocol: "https://digideeds.io",
    external: {
      twitter: "https://twitter.com/digideeds",
      telegram: "https://t.me/digideeds",
      blog: "https://blog.digideeds.io/",
    },
  },

  meta: {
    title: "DigiDeeds",
    keywords: "Bitcoin Liquid NFT Real Estate",
    description: "Digital deeds on the bitcoin liquid network.",
    image: "https://digideeds.io/splash.png",
    url: "https://digideeds.io/",

    twitter: {
      card: "summary_large_image",
      creator: "@digideeds",
      site: "@digideeds",
    },

    artwork: (art) => ({
      title: `DigiDeeds - ${art.title}`,
      image: `/api/ipfs/${art.filename}`,
      url: `https://digideeds.io/a/${art.slug}`,
    }),
  },

  emails: {
    support: "support@digideeds.com",
  },
};

export default BRANDING;
