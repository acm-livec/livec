const fs = require('fs');
const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const resolve = (...segments) => path.resolve(__dirname, ...segments);



function createDB(targetPath, defaultJsonPath, { forceReset = false } = {}) {
    const filePath = resolve(targetPath);
    const defaultData = require(resolve(defaultJsonPath));
    const adapter = new JSONFile(filePath);
    const db = new Low(adapter, defaultData);

    (async () => {
        try {
            await db.read();
            if (forceReset || !db.data) {
                db.data = defaultData;
                await db.write();
            }
        } catch (err) {
            console.warn(`⚠️ Failed to load ${filePath}, reinitializing with defaults.`);
            db.data = defaultData;
            await db.write();
        }



    })();
    db.reset = async () => {
        db.data = defaultData;
        await db.write();
    };

    return db;
}



const reset = false

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
                'data/curriculums/computer-science/page_content.json',
                'data/curriculums/computer-science/default/page_content.json',
                { forceReset: reset }
            )
        },
        cybersecurity: {
            tableOfContents: createDB(
                'data/curriculums/cybersecurity/table_of_contents.json',
                'data/curriculums/cybersecurity/default/table_of_contents.json',
                { forceReset: reset }
            ),
            pageContent: createDB(
                'data/curriculums/cybersecurity/page_content.json',
                'data/curriculums/cybersecurity/default/page_content.json',
                { forceReset: reset }
            )
        }
    },
    curriculumVersions: {
        computerScience: createDB(
            'data/curriculums/computer-science/versions.json',
            'data/curriculums/computer-science/default/versions.json',
            { forceReset: reset }
        ),
        cybersecurity: createDB(
            'data/curriculums/cybersecurity/versions.json',
            'data/curriculums/cybersecurity/default/versions.json',
            { forceReset: reset }
        )
    }
};
async function resetAll() {
    await Promise.all([
        db.users.communityMembers.reset(),
        db.users.reviewers.reset(),
        db.users.associateEditors.reset(),
        db.users.chiefEditors.reset(),
        db.suggestions.reset(),
        db.curriculums.computerScience.tableOfContents.reset(),
        db.curriculums.computerScience.pageContent.reset(),
        db.curriculums.cybersecurity.tableOfContents.reset(),
        db.curriculums.cybersecurity.pageContent.reset(),
        db.curriculumVersions.computerScience.reset(),
        db.curriculumVersions.cybersecurity.reset(),
    ]);
}

// Attach resetAll to exported db for manual resets
db.resetAll = resetAll;
module.exports = db;
