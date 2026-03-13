import { faker } from "@faker-js/faker";

export class RandomDataUtil {

    static getFirstName()
    {
        faker.person.firstName();
        return faker.person.firstName();
    }

    static getLastName()
    {
        faker.person.lastName();
        return faker.person.lastName();
    }

    static getEmail()
    {
        faker.internet.email();
        return faker.internet.email();
    }

    static getUserName()
    {
        faker.internet.userName();
        return faker.internet.userName();
    }

    static getPassword()
    {
        faker.internet.password();
        return faker.internet.password();
    }

    static getPhoneNumber()
    {
        faker.phone.number();
        return faker.phone.number();
    }
}