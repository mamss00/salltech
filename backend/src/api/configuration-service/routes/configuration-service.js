'use strict';

/**
 * configuration-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::configuration-service.configuration-service');
