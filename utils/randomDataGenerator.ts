import { faker } from "@faker-js/faker";
export 

 class RandomDataUtil {

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
        faker.internet.username();
        return faker.internet.username();
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

    static getrandomInt(min: 4, max: 6)
    {
        return faker.number.int({ min, max });
    }
}