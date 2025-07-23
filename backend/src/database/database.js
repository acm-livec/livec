const fs = require('fs');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const resolve = (...segments) => path.resolve(__dirname, ...segments);

let hasReset = false;


function createDB(targetPath, defaultJsonPath, { forceReset = false } = {}) {
    const filePath = resolve(targetPath);
    const defaultData = require(resolve(defaultJsonPath));
    const adapter = new JSONFile(filePath);
    const db = new Low(adapter, defaultData);

    (async () => {
        try {
            await db.read();
            if (forceReset && !hasReset) {
                db.data = defaultData;
                await db.write();
            }
        } catch (err) {
            console.warn(`⚠️ Failed to load ${filePath}, reinitializing with defaults.`);
            db.data = defaultData;
            await db.write();
        }

        // fs.watchFile(filePath, { interval: 1000 }, async (curr, prev) => {
        //     if (curr.mtimeMs > prev.mtimeMs) {
        //         try {
        //             await db.read();
        //         } catch (err) {
        //             console.warn(`⚠️ Failed to hot-reload ${filePath}:`, err.message);
        //         }
        //     }
        // });
        hasReset = true;

    })();

    return db;
}


// function createDB(filename, defaultJsonPath) {
//     const filePath = path.join(__dirname, filename);
//     const defaultData = require(resolve(defaultJsonPath));

//     const adapter = new JSONFile(filePath);
//     const db = new Low(adapter, defaultData);

//     (async () => {
//         const existed = fs.existsSync(filePath);

//         try {
//             await db.read();
//             if (db.data === null || db.data === undefined) {
//                 db.data = defaultData;
//                 if (!existed) await db.write();
//             }
//         } catch (err) {
//             console.warn(`⚠️ Failed to read ${filename}, reinitializing with defaults.`);
//             db.data = defaultData;
//             await db.write();
//         }

//         // Watch the file for external changes, safely re-read
//         fs.watchFile(filePath, { interval: 1000 }, async (curr, prev) => {
//             if (curr.mtimeMs > prev.mtimeMs) {
//                 try {
//                     await db.read();
//                 } catch (err) {
//                     console.warn(`⚠️ Failed to hot-reload ${filename}:`, err.message);
//                 }
//             }
//         });
//     })();

//     return db;
// }

// Initialize your DB structure
const reset = !(process.env.RESET_DB === 'true');

const db = {
    users: {
        communityMembers: createDB(
            'data/users/community_member.json',
            'data/users/default/community_member.json',
            { forceReset: reset }
        ),
        reviewers: createDB(
            'data/users/reviewer.json',
            'data/users/default/reviewer.json',
            { forceReset: reset }
        ),
        associateEditors: createDB(
            'data/users/associate_editor.json',
            'data/users/default/associate_editor.json',
            { forceReset: reset }
        ),
        chiefEditors: createDB(
            'data/users/editor_in_chief.json',
            'data/users/default/editor_in_chief.json',
            { forceReset: reset }
        ),
        // acmEdBoard: createDB(...), // Uncomment if needed
    },
    suggestions: createDB(
        'data/suggestions/suggestions.json',
        'data/suggestions/default/suggestions.json',
        { forceReset: reset }
    ),
    curriculums: {
        computerScience: {
            tableOfContents: createDB(
                'data/curriculums/computer-science/table_of_contents.json',
                'data/curriculums/computer-science/default/table_of_contents.json',
                { forceReset: reset }
            ),
            pageContent: createDB(
                'data/curriculums/computer-science/codex.json',
                'data/curriculums/computer-science/default/codex.json',
                { forceReset: reset }
            )
        }
    }
};

module.exports = db;
