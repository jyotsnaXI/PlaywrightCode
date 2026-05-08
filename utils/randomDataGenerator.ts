import { faker } from "@faker-js/faker";
export

    class RandomDataGenerator {

    static getFirstName() {
        faker.person.firstName();
        return faker.person.firstName();
    }

    static getLastName() {
        faker.person.lastName();
        return faker.person.lastName();
    }

    static getEmail() {
        faker.internet.email();
        return faker.internet.email();
    }

    static getUserName() {
        faker.internet.username();
        return faker.internet.username();
    }

    static getPassword() {
        faker.internet.password();
        return faker.internet.password();
    }

    static getPhoneNumber() {
        faker.phone.number();
        return faker.phone.number();
    }

    static getrandomInt(min: number, max: number) {
        return faker.number.int({ min, max });
    }

    static generateNumber(length: number): string {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10); // 0–9
     }
    return result;
}
}