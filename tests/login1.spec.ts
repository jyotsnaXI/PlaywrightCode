
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';
import { TestConfig } from '../test.config';

let loginPage: LoginPage;
let searchEmployeePage: SearchEmployeePage;
const config = new TestConfig();

test.beforeEach(async ({ page }) => {
    await page.goto(config.appUrl);
    loginPage = new LoginPage(page);
    searchEmployeePage = new SearchEmployeePage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('user login test @master', async ({ page }) => {
    
    // Verify sucessful login
    const isLoggedIn = await searchEmployeePage.isMySearchPageExists();
    expect (isLoggedIn).toBeTruthy();
});