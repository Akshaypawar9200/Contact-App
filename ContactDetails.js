const Contact = require("./Contact");

class ContactDetails {
    static id = 0;

    constructor(typeOfCd, valueOfCd) {
        this.id = ContactDetails.id++;
        this.typeOfCd = typeOfCd;
        this.valueOfCd = valueOfCd;
    }

    static newContactDetails(typeOfCd, valueOfCd) {
        try {
            if (typeof typeOfCd !== "string") {
                throw new Error("Invalid typeOfCd");
            }
            if (typeof valueOfCd !== "number") {
                throw new Error("Invalid valueOfCd");
            }
            return new ContactDetails(typeOfCd, valueOfCd);
        } catch (error) {
            throw error;
        }
    }

    updateTypeOfContactDetail(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.typeOfCd = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateValueOfContactDetail(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new Error("Invalid value");
            }
            this.valueOfCd = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateContactDetails(parameter, newValue) {
        try {
            if (typeof parameter !== "string") {
                throw new Error("Invalid parameter");
            }
            switch (parameter) {
                case "typeOfContactDetail":
                    return this.updateTypeOfContactDetail(newValue);
                case "valueOfContactDetail":
                    return this.updateValueOfContactDetail(newValue);
                default:
                    return "Invalid param";
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContactDetails;
