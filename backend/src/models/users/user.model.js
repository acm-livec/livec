const { generateUserId } = require('@utils/generate-id');


class User {
    constructor(data) {
        this.id = data.id || generateUserId(data.role);
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.role = data.role;
    }

    

    toPublic() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
        };
    }

    comparePasswords(input) {
        return this.password === input;
    }

}


module.exports = User;
