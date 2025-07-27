const Users = require('../users.model.js');
const EditorInChief = require('./chief.model.js');


class EditorsInChief extends Users {
    static Model = EditorInChief;
    static roleKey = 'chiefEditors';



}

module.exports = EditorsInChief;
