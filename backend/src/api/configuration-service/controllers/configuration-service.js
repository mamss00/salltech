'use strict';

/**
 * configuration-service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::configuration-service.configuration-service');
