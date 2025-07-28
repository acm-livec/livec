import path from 'path';

const resolve = (...segments) => path.resolve(__dirname, ...segments);

async function createDB(targetPath, defaultJsonPath, { forceReset = false } = {}) {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const filePath = resolve(targetPath);
  const defaultData = require(resolve(defaultJsonPath));
  const adapter = new JSONFile(filePath);
  const db = new Low(adapter, defaultData);
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

  db.reset = async () => {
    db.data = defaultData;
    await db.write();
  };

  return db;
}

async function createDatabases(options = {}) {
  const reset = options.forceReset || false;
  const db = {
    users: {
      communityMembers: await createDB(
        'data/users/community_member.json',
        'data/users/default/community_member.json',
        { forceReset: reset }
      ),
      reviewers: await createDB(
        'data/users/reviewer.json',
        'data/users/default/reviewer.json',
        { forceReset: reset }
      ),
      associateEditors: await createDB(
        'data/users/associate_editor.json',
        'data/users/default/associate_editor.json',
        { forceReset: reset }
      ),
      chiefEditors: await createDB(
        'data/users/editor_in_chief.json',
        'data/users/default/editor_in_chief.json',
        { forceReset: reset }
      ),
      admins: await createDB(
        'data/users/admin.json',
        'data/users/default/admin.json',
        { forceReset: reset }
      ),
    },
    suggestions: await createDB(
      'data/suggestions/suggestions.json',
      'data/suggestions/default/suggestions.json',
      { forceReset: reset }
    ),
    curriculums: {
      computerScience: {
        tableOfContents: await createDB(
          'data/curriculums/computer-science/table_of_contents.json',
          'data/curriculums/computer-science/default/table_of_contents.json',
          { forceReset: reset }
        ),
        pageContent: await createDB(
          'data/curriculums/computer-science/page_content.json',
          'data/curriculums/computer-science/default/page_content.json',
          { forceReset: reset }
        ),
        curriculumVersions: await createDB(
          'data/curriculums/computer-science/versions.json',
          'data/curriculums/computer-science/default/versions.json',
          { forceReset: reset }
        ),
      },
      cybersecurity: {
        tableOfContents: await createDB(
          'data/curriculums/cybersecurity/table_of_contents.json',
          'data/curriculums/cybersecurity/default/table_of_contents.json',
          { forceReset: reset }
        ),
        pageContent: await createDB(
          'data/curriculums/cybersecurity/page_content.json',
          'data/curriculums/cybersecurity/default/page_content.json',
          { forceReset: reset }
        ),
        curriculumVersions: await createDB(
          'data/curriculums/cybersecurity/versions.json',
          'data/curriculums/cybersecurity/default/versions.json',
          { forceReset: reset }
        ),
      },
    },
  };

  async function resetAll() {
    await Promise.all([
      db.users.communityMembers.reset(),
      db.users.reviewers.reset(),
      db.users.associateEditors.reset(),
      db.users.chiefEditors.reset(),
      db.users.admins.reset(),
      db.suggestions.reset(),
      db.curriculums.computerScience.tableOfContents.reset(),
      db.curriculums.computerScience.pageContent.reset(),
      db.curriculums.computerScience.curriculumVersions.reset(),
      db.curriculums.cybersecurity.tableOfContents.reset(),
      db.curriculums.cybersecurity.pageContent.reset(),
      db.curriculums.cybersecurity.curriculumVersions.reset(),
    ]);
  }

  db.resetAll = resetAll;
  return db;
}

module.exports = { createDB, createDatabases };
