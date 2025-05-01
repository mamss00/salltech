'use strict';

/**
 * configuration-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::configuration-service.configuration-service');
