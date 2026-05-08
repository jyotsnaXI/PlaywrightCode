import { expect, Page, Locator } from "@playwright/test";
import path from "path/win32";
import { title } from "process";

export class CreateTeamMemberPage {
    readonly page: Page;

    // =========== Locators ==========
    private pageTitle: Locator;
    private sideMenuBar: Locator;
    private userRoleDropdown: Locator;
    private titleDropdown: Locator;
    private lastNameInput: Locator;
    private firstNameInput: Locator;
    private dobInput: Locator;
    private genderDropdown: Locator;
    private primaryEmailInput: Locator;
    private userNameInput: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.userRoleDropdown = page.locator("#ctl00_MedtrackContentPlaceHolder_ddlRoleList");
        this.pageTitle = page.locator('#divMainHeading');
        this.sideMenuBar = page.getByRole('link', { name: /Create Team Member/i });
        this.titleDropdown = page.locator("#ctl00_MedtrackContentPlaceHolder_ddlTitle");
        this.lastNameInput = page.locator("#ctl00_MedtrackContentPlaceHolder_txtLastName");
        this.firstNameInput = page.locator("#ctl00_MedtrackContentPlaceHolder_txtFirstName");
        this.dobInput = page.locator("#ctl00_MedtrackContentPlaceHolder_calDateOfBirth_txtDate");
        this.genderDropdown = page.locator("#ctl00_MedtrackContentPlaceHolder_ddlSex");
        this.primaryEmailInput = page.locator("#ctl00_MedtrackContentPlaceHolder_txtPrimaryEmail");
        this.userNameInput = page.locator("#ctl00_MedtrackContentPlaceHolder_txtUserName");
        this.submitButton = page.locator("#ctl00_MedtrackContentPlaceHolder_btnSubmit");
    }

    async goto(path = '/UserManagement/CreateUser.aspx') {
        await this.page.goto(path);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async setUserRole(userRole: string) {
        await this.userRoleDropdown.selectOption(userRole);
    }
    async setTitle(title: string) {
        await this.titleDropdown.selectOption(title);
    }
    async setFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }
    async setLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }
    async setDob(dob: string) {
        await this.dobInput.fill(dob);
    }
    async setGender(gender: string) {
        await this.genderDropdown.selectOption(gender);
    }
    async setPrimaryEmail(email: string) {
        await this.primaryEmailInput.fill(email);
    }
    async setUserName(userName: string) {
        await this.userNameInput.fill(userName);
    }
    async clickSubmit() {
        await this.submitButton.click();
    }

}

