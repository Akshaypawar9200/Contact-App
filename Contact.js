const ContactDetails = require("./ContactDetails");

class Contact {
    static id = 0;
    
    constructor(firstName, lastName) {
        this.id = Contact.id++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = true;
        this.contactDetails = [];
    }

    static newContact(firstName, lastName) {
        try {
            if (typeof firstName !== "string") {
                throw new Error("Invalid firstName");
            }
            if (typeof lastName !== "string") {
                throw new Error("Invalid lastName");
            }
            return new Contact(firstName, lastName);
        } catch (error) {
            throw error;
        }
    }

    updateFirstName(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.firstName = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateLastName(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.lastName = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateContact(parameter, newValue) {
        try {
            if (typeof parameter !== "string") {
                throw new Error("Invalid parameter");
            }
            switch (parameter) {
                case "firstName":
                    return this.updateFirstName(newValue);
                case "lastName":
                    return this.updateLastName(newValue);
                default:
                    return "Invalid param";
            }
        } catch (error) {
            throw error;
        }
    }

    createContactDetail(typeOfCd, valueOfCd) {
        try {
            if (this.isAdmin) {
                throw new Error("Admin cannot create contact-details");
            }

            let contactDetail = ContactDetails.newContactDetails(typeOfCd, valueOfCd);
            this.contactDetails.push(contactDetail);
            return contactDetail;
        } catch (error) {
            throw error;
        }
    }

    deleteContact() {
        this.isActive = false;
    }

    getAllContactDetail() {
        return this.contactDetails;
    }

    findContactDetails(contactDetailId) {
        for (let i = 0; i < this.contactDetails.length; i++) {
            if (contactDetailId === this.contactDetails[i].id) {
                return this.contactDetails[i];
            }
        }
        return null;
    }

    updateContactDetailFromContact(contactDetailId, parameter, newValue) {
        let contactDetailToUpdate = this.findContactDetails(contactDetailId);
        if (contactDetailToUpdate === null) {
            return "Contact detail not found";
        }
        return contactDetailToUpdate.updateContactDetails(parameter, newValue);
    }

    getContactDetailId(contactDetailId) {
        for (let i = 0; i < this.contactDetails.length; i++) {
            if (contactDetailId === this.contactDetails[i].id) {
                return this.contactDetails[i].id;
            }
        }
    }

    deleteContactDetailsFromContact(contactDetailId) {
        let contactDetailIndex = this.getContactDetailId(contactDetailId);
        if (contactDetailIndex !== null) {
            this.contactDetails.splice(contactDetailIndex, 1);
        } else {
            return "Contact detail not found";
        }
    }
}

module.exports = Contact;
