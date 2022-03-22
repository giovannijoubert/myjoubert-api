'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async memoji_list(ctx) {
        var startCount = 0;
        var peopleQry = await strapi.services.person.find({ _limit: 50, _start: startCount});
        var people = [];

        while(peopleQry.length > 0) {
            people = people.concat(peopleQry);
            startCount = startCount+50;
            peopleQry = await strapi.services.person.find({ _limit: 50, _start: startCount});
        }

        var memojis = [];

        for(var i = 0; i < people.length; i++) {
            var friends_group = [];

            if(people[i].friend_group_kerk_bandies) friends_group.push('kerk_bandies');
            if(people[i].friend_group_hele_sirkus) friends_group.push('hele_sirkus');
            if(people[i].friend_group_ons_ark) friends_group.push('ons_ark');
            if(people[i].friend_group_wynklub) friends_group.push('wynklub');
            if(people[i].friend_group_koffie_sel) friends_group.push('koffie_sel');

            let memoji = {name: people[i].name, id: people[i].id, friends_group: friends_group}
            memojis.push(memoji);
        }

        return memojis;

    },

    async create(ctx) {
        let guest;
        let invite;

        const inviteID = ctx.request.body.invite._id;
        
        invite = await strapi.services.invite.findOne({ id: inviteID });

        if(invite.num_additional_guests > 0) {

            ctx.request.body.guest.additional_guest = true;
            ctx.request.body.guest.attending = true;
            ctx.request.body.guest.invite = invite;
       
            guest = await strapi.services.person.create(ctx.request.body.guest);
            await strapi.services.invite.update({ id: inviteID }, { num_additional_guests: invite.num_additional_guests-1 });
            return sanitizeEntity(guest, { model: strapi.models.person });

        } else {
            return 'max invited' ;
        }

      },
};
