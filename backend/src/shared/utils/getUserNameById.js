let db;

function injectDB(instance) {
    db = instance;
}

const roleMap = {
    CM: 'communityMembers',
    AE: 'associateEditors',
    R: 'reviewers',
    EIC: 'chiefEditors',
    AD: 'admins'
};

async function getUserNameById(id) {
    const prefix = id.split('-')[0];
    const roleKey = roleMap[prefix];
    if (!roleKey) return id;
    const dbRef = db.users[roleKey];
    if (!dbRef) return id;
    await dbRef.read();
    const found = dbRef.data.find(u => u.id === id);
    return found ? found.name : id;
}

module.exports = {
    getUserNameById,
    injectDB
};
