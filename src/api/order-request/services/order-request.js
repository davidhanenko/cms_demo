'use strict';

/**
 * order-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order-request.order-request');
