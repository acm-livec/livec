const Users = require('../users.model.js');
const CommunityMember = require('./member.model.js');


class CommunityMembers extends Users {
    static Model = CommunityMember;
    static roleKey = 'communityMembers';
}

module.exports = CommunityMembers;
