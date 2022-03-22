'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async searchSongs(ctx) {
      var jsonpRequest = require('then-jsonp');

      var itunesResults = jsonpRequest('GET',   'https://itunes.apple.com/search?media=music&limit=6&term=' +
      encodeURIComponent(ctx.query.qry));

      var koaResult = new Promise((resolve,reject)=>{
        itunesResults.done(function (res) {
          resolve(res);
        });
      });

      koaResult = await koaResult;
      ctx.send(koaResult);

  },
};
