require('../backend/node_modules/module-alias/register');

const handleNewSuggestion = require('../backend/src/features/suggestion/services/handle-suggestion.js');

async function testAssignFailure() {
  try {
    await handleNewSuggestion('CM-0001', 'Bad', 'bad', 'physics', 'X');
    console.log('AE failure test: FAILED');
  } catch (err) {
    console.log('AE failure test:', true);
  }
}

async function testCurriculumFailure() {
  try {
    await handleNewSuggestion('CM-0001', 'Bad', 'bad', 'computer-science', 'invalid-section');
    console.log('Curriculum failure test: FAILED');
  } catch (err) {
    console.log('Curriculum failure test:', true);
  }
}

if (require.main === module) {
  (async () => {
    await testAssignFailure();
    await testCurriculumFailure();
  })();
}
