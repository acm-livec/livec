import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolve = (...segments) => path.resolve(__dirname, ...segments);

async function createDB(targetPath, defaultJsonPath, { forceReset = false } = {}) {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const filePath = resolve(targetPath);
  const defaultDataModule = await import(
    resolve(defaultJsonPath),
    { assert: { type: 'json' } }
  );
  const defaultData = defaultDataModule.default;
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

  const userSpecs = [
    ['communityMembers', 'community_member'],
    ['reviewers', 'reviewer'],
    ['associateEditors', 'associate_editor'],
    ['chiefEditors', 'editor_in_chief'],
    ['admins', 'admin'],
  ];

  const userEntries = await Promise.all(
    userSpecs.map(async ([key, file]) => [
      key,
      await createDB(
        `data/users/${file}.json`,
        `data/users/default/${file}.json`,
        { forceReset: reset }
      ),
    ])
  );

  const users = Object.fromEntries(userEntries);

  const curriculumSpecs = [
    ['computerScience', 'computer-science'],
    ['cybersecurity', 'cybersecurity'],
  ];

  const curriculumEntries = await Promise.all(
    curriculumSpecs.map(async ([key, dir]) => {
      const [tableOfContents, pageContent, curriculumVersions] = await Promise.all([
        createDB(
          `data/curriculums/${dir}/table_of_contents.json`,
          `data/curriculums/${dir}/default/table_of_contents.json`,
          { forceReset: reset }
        ),
        createDB(
          `data/curriculums/${dir}/page_content.json`,
          `data/curriculums/${dir}/default/page_content.json`,
          { forceReset: reset }
        ),
        createDB(
          `data/curriculums/${dir}/versions.json`,
          `data/curriculums/${dir}/default/versions.json`,
          { forceReset: reset }
        ),
      ]);

      return [key, { tableOfContents, pageContent, curriculumVersions }];
    })
  );

  const curriculums = Object.fromEntries(curriculumEntries);

  const suggestions = await createDB(
    'data/suggestions/suggestions.json',
    'data/suggestions/default/suggestions.json',
    { forceReset: reset }
  );

  const db = {
    users,
    suggestions,
    curriculums,
  };

  async function resetAll() {
    await Promise.all([
      ...Object.values(db.users).map((u) => u.reset()),
      db.suggestions.reset(),
      ...Object.values(db.curriculums).flatMap((c) => [
        c.tableOfContents.reset(),
        c.pageContent.reset(),
        c.curriculumVersions.reset(),
      ]),
    ]);
  }

  db.resetAll = resetAll;
  return db;
}

export { createDB, createDatabases };
