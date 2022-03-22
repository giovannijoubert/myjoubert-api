'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        // console.log(await strapi.services['song-suggestion-vote'].find())
        
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services['song-suggestion-vote'].create(data, { files });
        } else {
         if(await strapi.services['song-suggestion-vote'].findOne(ctx.request.body) !== null) return {message: 'Duplicate', object: await strapi.services['song-suggestion-vote'].findOne(ctx.request.body)};
          entity = await strapi.services['song-suggestion-vote'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['song-suggestion-vote']});
      },
};