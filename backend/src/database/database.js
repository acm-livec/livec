const fs = require('fs');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

function createDB(filename, defaultData) {
    const filePath = path.join(__dirname, filename);
    const adapter = new JSONFile(filePath);
    const db = new Low(adapter, defaultData);

    (async () => {
        const existed = fs.existsSync(filePath);

        try {
            await db.read();
            if (db.data === null || db.data === undefined) {
                db.data = defaultData;
                if (!existed) await db.write();
            }
        } catch (err) {
            console.warn(`⚠️ Failed to read ${filename}, reinitializing with defaults.`);
            db.data = defaultData;
            await db.write();
        }

        // Watch the file for external changes, safely re-read
        fs.watchFile(filePath, { interval: 1000 }, async (curr, prev) => {
            if (curr.mtimeMs > prev.mtimeMs) {
                try {
                    await db.read();
                } catch (err) {
                    console.warn(`⚠️ Failed to hot-reload ${filename}:`, err.message);
                }
            }
        });
    })();

    return db;
}

// Initialize your DB structure
const db = {
    users: {
        communityMembers: createDB('data/users/community_member.json', []),
        reviewers: createDB('data/users/reviewer.json', []),
        associateEditors: createDB('data/users/associate_editor.json', []),
        chiefEditors: createDB('data/users/editor_in_chief.json', []),
        acmEdBoard: createDB('data/users/ed_board', [])
    },
    suggestions: createDB('data/suggestions/suggestions.json', []),
    curriculums: createDB('data/curriculums/curriculums.json', [])
};

module.exports = db;
