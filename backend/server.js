const { createStrapi } = require("@strapi/strapi");

const strapi = createStrapi();

const port = process.env.PORT || 1337;
const host = process.env.HOST || '0.0.0.0';

strapi.start({ port, host });
