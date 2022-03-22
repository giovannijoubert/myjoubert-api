'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.invite.findOne({ id });

        await strapi.services.invite.update({ id }, {
            last_login: new Date(),
            login_count: entity.login_count + 1
        });
      

        return sanitizeEntity(entity, { model: strapi.models.invite });
      },
};
