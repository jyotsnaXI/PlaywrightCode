import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';


// Load JSON test data logindata.json

const jsonPath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData) {
    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const loginPage = new LoginPage(page);
        await loginPage.setUsername(data.username);
        await loginPage.setPassword(data.password);
        await loginPage.setCapcha(data.capchaInputField);
        await loginPage.clickLogin();

        if (data.expectedResult.toLowerCase() === 'success') {
            const searchEmpPage = new SearchEmployeePage(page);
            const isLoggedIn = await searchEmpPage.isMySearchPageExists();
            expect(isLoggedIn).toBeTruthy();

        }
        else {
            const errorMessage = await loginPage.getloginErrorMessage();
            expect(errorMessage).toBe('Your user name or password is incorrect. Please try again.');
        }
    })

}

//Load CSV test data logindata.json

const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);

for (const data of csvTestData) {
    test(`Login Test with CSV Data: ${data.testName} @datadriven`, async ({ page }) => {

        const config = new TestConfig(); // create instance
        await page.goto(config.appUrl);    // getting appURL from test.config.ts file

        const loginPage = new LoginPage(page);
        await loginPage.setUsername(data.email);
        await loginPage.setPassword(data.password);
        await loginPage.setCapcha(data.capchaInputField);
        await loginPage.clickLogin();

        if (data.expected.toLowerCase() === 'success') {
            const searchEmpPage = new SearchEmployeePage(page);
            const isLoggedIn = await loginPage.verifyLoginSuccess();
            expect(isLoggedIn).toBeTruthy();

        }
        else {
            const errorMessage = await loginPage.getloginErrorMessage();
            expect(errorMessage).toContain('Your user name or password is incorrect. Please try again.');
        }
    })

}