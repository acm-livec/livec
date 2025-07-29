import Users from '../users.model.js';
import CommunityMember from './member.model.js';


class CommunityMembers extends Users {
    static Model = CommunityMember;
    static roleKey = 'communityMembers';
}

Users.registerRole(CommunityMembers.roleKey, CommunityMembers);

export default CommunityMembers;
