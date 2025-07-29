import Users from '../users.model.js';
import EditorInChief from './chief.model.js';


class EditorsInChief extends Users {
    static Model = EditorInChief;
    static roleKey = 'chiefEditors';



}

Users.registerRole(EditorsInChief.roleKey, EditorsInChief);

export default EditorsInChief;
