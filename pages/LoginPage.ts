import { Page, Locator, expect } from '@playwright/test';
import { log } from 'node:console';

export class LoginPage {

    private readonly page: Page;
    //locators
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly capchaText: Locator;
    private readonly capchaInputField: Locator;
    private readonly loginSubmit: Locator;
    private readonly logout: Locator;
    private readonly txtErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.username = page.locator('#ctl00_MedtrackContentPlaceHolder_UserName');
        this.password = page.locator('#ctl00_MedtrackContentPlaceHolder_Password');
        this.capchaText = page.locator('#captchaText');
        this.capchaInputField = page.locator('#captchaInput');
        this.loginSubmit = page.locator('#ctl00_MedtrackContentPlaceHolder_bLogin');
        this.logout = page.locator('#ctl00_loginView_btnLogout');
        this.txtErrorMessage = page.locator("//div[@class='ErrorBg']");
    }

    
    //action methods
    async setUsername(username: string) {
        await this.username.fill(username);
    }

    async setPassword(password: string) {
        await this.password.fill(password);
    }
    async setCapcha(capchaInputField: string) {
        const myCaptha = await this.capchaText.textContent();
        const strOne = myCaptha!.split("+");

        const s1 = strOne[0].trim();
        const s2 = strOne[1];
        const s3 = s2.split("=");
        const s4 = s3[0].trim();

        const intOne = parseInt(s1);
        const intTwo = parseInt(s4);

        const sum = intOne + intTwo;

        await this.capchaInputField.type(sum.toString());
    }
    async clickLogin() {
        await this.loginSubmit.click();
    }
    async verifyLoginSuccess() {
    //await expect(this.page.locator("text=MedFit - Search Employee")).toBeVisible();
    await expect(this.page).toHaveTitle(/Search Employee/i);  }
     async getloginErrorMessage(){
        const errorMessage=await this.txtErrorMessage.textContent();
        log(`Error message is: ${errorMessage}`);
        return errorMessage!.trim();
    }
    async clickLogout() {
        await this.logout.click();
    }


}