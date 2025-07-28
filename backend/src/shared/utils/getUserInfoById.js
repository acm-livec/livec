const db = require('@database/database');

const roleMap = {
    CM: 'communityMembers',
    AE: 'associateEditors',
    R: 'reviewers',
    EIC: 'chiefEditors',
};

async function getUserInfoById(id) {
    const prefix = id.split('-')[0];
    const roleKey = roleMap[prefix];
    if (!roleKey) return { name: id, role: 'unknown' };
    const dbRef = db.users[roleKey];
    if (!dbRef) return { name: id, role: 'unknown' };
    await dbRef.read();
    const found = dbRef.data.find((u) => u.id === id);
    return found ? { name: found.name, role: found.role } : { name: id, role: 'unknown' };
}

module.exports = getUserInfoById;
