const Contact = require("./Contact");

class User {
    static id = 0;
    static allUser = [];

    constructor(fname, lname, isAdmin) {
        this.id = User.id++;
        this.fname = fname;
        this.lname = lname;
        this.isAdmin = isAdmin;
        this.isActive = true;
        this.contacts = [];
    }
// create admin
    static newAdmin(fname, lname) {
        try {
            if (typeof fname !== "string") {
                throw new Error("Invalid firstName");
            }
            if (typeof lname !== "string") {
                throw new Error("Invalid lastName");
            }
            return new User(fname, lname, true);
        } catch (error) {
            console.log(error);
        }
    }
// create user
    createUser(fname, lname) {
        try {
            if (!this.isAdmin) {
                return "You are not an admin";
            }
            if (typeof fname !== "string") {
                return "Invalid firstName";
            }
            if (typeof lname !== "string") {
                return "Invalid lastName";
            }
            let newUser = new User(fname, lname, false);
            User.allUser.push(newUser);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }
// find user
    static findUser(id) {
        for (let i = 0; i < User.allUser.length; i++) {
            if (User.allUser[i].id === id) {
                return User.allUser[i];
            }
        }
        return null;
    }

// alluser
    getAllUser() {
        return User.allUser;
    }
// update firstname of user
    updateFirstName(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.fname = newValue;
        } catch (error) {
            throw error;
        }
    }
// update lastname of user
    updateLastName(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.lname = newValue;
        } catch (error) {
            throw error;
        }
    }
// delete user
    deleteUser(id) {
        try {
            if (!this.isAdmin) {
                throw new Error("You are not an admin");
            }

            if (typeof id !== "number") {
                throw new Error("Invalid ID");
            }

            const userToBeDeleted = User.findUser(id);

            if (userToBeDeleted === null) {
                throw new Error("User not found");
            }

            userToBeDeleted.isActive = false;
        } catch (error) {
            console.log(error.message);
        }
    }

// update user

    updateUser(id, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new Error("You are not an admin");
            }
            let userToBeUpdated = User.findUser(id);

            if (typeof parameter !== "string") {
                throw new Error("Invalid parameter");
            }
            if (userToBeUpdated === null) {
                throw new Error("User not found");
            }

            switch (parameter) {
                case "firstName":
                    userToBeUpdated.updateFirstName(newValue);
                    return userToBeUpdated;
                case "lastName":
                    userToBeUpdated.updateLastName(newValue);
                    return userToBeUpdated;
                default:
                    return "Invalid parameter";
            }
        } catch (error) {
            return error.message
        }
    }
// create contact
    createContact(firstName, lastName) {
        if (this.isAdmin) {
            throw new Error("Admin cannot create contact");
        }
        if(!this.isActive){
            throw new Error("user doesn't exist")
        }
        let newContact = Contact.newContact(firstName, lastName);
        this.contacts.push(newContact);
        return newContact;
    }
// find contact 
    findContact(id) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (id === this.contacts[i].id) {
                return this.contacts[i];
            }
        }
        return null;
    }

    getAllContact() {
        return this.contacts;
    }
// update contact
    updateContact(id, parameter, newValue) {
        if (this.isAdmin) {
            throw new Error("Admin cannot update contact");
        }
        if(!this.isActive){
            throw new Error("user doesn't exist")
        }

        let contactToBeUpdated = this.findContact(id);
        if (contactToBeUpdated === null) {
            throw new Error("Contact not found");
        }
        return contactToBeUpdated.updateContact(parameter, newValue);
    }
// delete Contact
    deleteContacts(id) {
        try {
            if (this.isAdmin) {
                throw new Error("Admin cannot delete contact");
            }

            if (typeof id !== "number") {
                throw new Error("Invalid ID");
            }

            let contactToBeDeleted = this.findContact(id);

            if (contactToBeDeleted === null) {
                throw new Error("Contact not found");
            }

            contactToBeDeleted.deleteContact();
        } catch (error) {
            return error.message
        }
    }
// create contact details
    createContactDetails(typeOfCd, newValue, id) {
        try {
            if(!this.isActive){
                throw new Error("contact doesn't exist")
            }
            if (this.isAdmin) {
                throw new Error("Admin cannot create contact-details");
            }
            let contactObj = this.findContact(id);
            if (contactObj === null) {
                throw new Error("Invalid ID");
            }
            contactObj.createContactDetail(typeOfCd, newValue);
            return contactObj;
        } catch (error) {
            return error.message
        }
    }
// update contact details
    updateContactDetail(id, contactDetailId, parameter, newValue) {
        try {
            if(!this.isActive){
                throw new Error("user doesn't exist")
            }
            if (this.isAdmin) {
                throw new Error("Admin cannot update contact");
            }
            if (typeof id !== "number") {
                throw new Error("Invalid contact ID");
            }

            let contactDetailsToBeUpdated = this.findContact(id);
            if (contactDetailsToBeUpdated === null) {
                throw new Error("Contact not found");
            }

            return contactDetailsToBeUpdated.updateContactDetailFromContact(contactDetailId, parameter, newValue);
        } catch (error) {
            return error.message
        }
    }
// delete contact details
    deleteContactDetails(id, contactDetailId) {
        try {
            if(!this.isActive){
                throw new Error("user doesn't exist")
            }
            if (this.isAdmin) {
                throw new Error("Admin cannot delete contact");
            }

            if (typeof id !== "number") {
                throw new Error("Invalid ID");
            }

            let contactDetailsToBeDeleted = this.findContact(id);

            if (contactDetailsToBeDeleted === null) {
                throw new Error("User not found");
            }

            contactDetailsToBeDeleted.deleteContactDetailsFromContact(contactDetailId);
        } catch (error) {
            return error.message
        }
    }
}

module.exports = User;
