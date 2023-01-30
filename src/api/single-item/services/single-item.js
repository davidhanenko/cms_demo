'use strict';

/**
 * single-item service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::single-item.single-item');
