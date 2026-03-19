import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login and save session', async ({ page, context }) => {

  const loginPage = new LoginPage(page);

  // Go to login page
  await context.clearCookies();
  await page.goto('https://gocare.msbedrock.com/');

  // Perform login
  await loginPage.setUsername('JyotsnaGupta');
  await loginPage.setPassword('Xebia@123456');
  await loginPage.setCapcha('capchaInputField');
 // await loginPage.clickLogin();

  await Promise.all([
    page.waitForNavigation(),
    loginPage.clickLogin()
  ]);

  await loginPage.verifyLoginSuccess();

  await page.context().storageState({ path: 'auth.json' });

  // Verify login success
 // await expect(page).toHaveTitle(/MedFit - Search Employee/i);

  // Save authentication state

});
  