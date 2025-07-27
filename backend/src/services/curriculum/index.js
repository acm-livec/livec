const getFullCurriculum = require('./get-one');
const getCurriculumSection = require('./get-section');
const updateCurriculumSection = require('./update-section');
const addCurriculumVersion = require('./add-version');
const getCurriculumVersion = require('./get-version');

module.exports = {
    getFullCurriculum,
    getCurriculumSection,
    updateCurriculumSection,
    addCurriculumVersion,
    getCurriculumVersion
};
