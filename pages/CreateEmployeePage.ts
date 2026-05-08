
import { expect, Locator, Page } from '@playwright/test';
import { utils } from 'xlsx';
import { RandomDataGenerator } from '../utils/randomDataGenerator';

export class CreateEmployeePage {
  readonly page: Page;

  // =========== Locators ==========
  private pageTitle: Locator;
  private sideMenuBar: Locator;
  private drpEmployeeStatus: Locator;
  private drpTitle: Locator;
  private drpGender: Locator;
  private drpMaritalStatus: Locator;
  private drpCompany: Locator;
  private lastName: Locator;
  private firstName: Locator;
  private dateOfBirth: Locator;
  private txtGINNumber: Locator;
  private txtApplicantID: Locator;
  private primaryEmail: Locator;
  private secondaryEmail: Locator;
  private empCategory: Locator;
  private recLastName: Locator;
  private recEmail: Locator;
  private recAddButton: Locator;
  private empCreationSuccMsg: Locator;

  // Michelin + others
  private drpCountry: Locator;
  private txtDateOfDeployment: Locator;
  private drpAssignCountry: Locator;
  private drpGeoMarket: Locator;
  private drpBusinessArea: Locator;

  private drpSituation: Locator;
  private drpEmployeeAccompanied: Locator;
  private drpOGUKRequired: Locator;
  private drpTBScreeningRequired: Locator;
  private drpTrainingHubRequired: Locator;

  private txtCity: Locator;
  private txtPostalCode: Locator;

  private submitButton: Locator;
  private cancelButton: Locator;

  // Alerts
  private successOrErrorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('#divMainHeading');
    this.sideMenuBar = page.getByRole('link', { name: /Create New Employee/i });
    this.drpEmployeeStatus = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlType');
    this.drpTitle = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlTitle');
    this.drpGender = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlSex');
    this.drpMaritalStatus = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlMaritalStatus');
    this.drpCompany = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlCompany');

    this.lastName = page.locator('#ctl00_MedtrackContentPlaceHolder_txtLastName');
    this.firstName = page.locator('#ctl00_MedtrackContentPlaceHolder_txtFirstName');
    this.dateOfBirth = page.locator('#ctl00_MedtrackContentPlaceHolder_calDateOfBirth_txtDate');
    this.txtGINNumber = page.locator('#ctl00_MedtrackContentPlaceHolder_txtGINNumber');
    this.txtApplicantID = page.locator('#ctl00_MedtrackContentPlaceHolder_txtApplicantID');

    this.primaryEmail = page.locator('#ctl00_MedtrackContentPlaceHolder_txtPrimaryEmail');
    this.secondaryEmail = page.locator('#ctl00_MedtrackContentPlaceHolder_txtSecondaryEmail');
    this.empCategory = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlCategory');

    this.recLastName = page.locator('#ctl00_MedtrackContentPlaceHolder_gvUserDetails_ctl03_txtUserLastName');
    this.recEmail = page.locator('#ctl00_MedtrackContentPlaceHolder_gvUserDetails_ctl03_txtUserRecruiterEmail');
    this.recAddButton = page.locator('#ctl00_MedtrackContentPlaceHolder_gvUserDetails_ctl03_btnAdd');

    this.empCreationSuccMsg = page.locator('#ctl00_MedtrackContentPlaceHolder_CreateUserMessages_SuccessM > div');

    this.drpCountry = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlCountry');
    this.txtDateOfDeployment = page.locator('#ctl00_MedtrackContentPlaceHolder_calDateofdeployment_txtDate');
    this.drpAssignCountry = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlAssignmentCountry');
    this.drpGeoMarket = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlGeoMarket');
    this.drpBusinessArea = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlBusinessArea');

    this.drpSituation = page.locator('#ddl34');
    this.drpEmployeeAccompanied = page.locator('#ddl38');
    this.drpOGUKRequired = page.locator('#ddl39');
    this.drpTBScreeningRequired = page.locator('#ddl40');
    this.drpTrainingHubRequired = page.locator('#ddl41');

    this.txtCity = page.locator('#ctl00_MedtrackContentPlaceHolder_txtTown');
    this.txtPostalCode = page.locator('#ctl00_MedtrackContentPlaceHolder_txtPostalCode');

    this.submitButton = page.locator('#ctl00_MedtrackContentPlaceHolder_btnSubmit');
    this.cancelButton = page.locator('#ctl00_MedtrackContentPlaceHolder_btnCancel');

    this.successOrErrorAlert = page.locator('.SuccessBg, .ErrorBg'); // aligns with your XPaths
  }

  /**
   * Go directly to Create Employee page.
   * Adjust the path to your actual route if different.
   */
  async goto(path = '/employee/createEmployee.aspx') {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
    // Best-effort heading wait (not all pages have ARIA headings)
    await this.pageTitle.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
  }

  /**
   * Use top nav link (if present on your current page).
   */
  async clickNewEmployeeLink() {
    await this.sideMenuBar.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // async setGIN(gin: number) {
  //   await this.txtGINNumber.fill(gin.toString());
  // }

  // async setApplicationID(applicationId: number) {
  //   await this.txtApplicantID.fill(applicationId.toString());
  // }

  // =========== Field Setters ===========

  async setEmpStatus(status: string) {
    await this.drpEmployeeStatus.selectOption({ label: status });

    // Mirror your Java branching:

    if ('Pre-employee' === status) {
      const applicantId = RandomDataGenerator.getrandomInt(2, 6);
      await this.txtApplicantID.fill(applicantId.toString());
      const recruiterLastName = 'mark';
      const recruiterEmail = 'gpt.jyotsna@gmail.com';
      await this.txtApplicantID.fill(String(applicantId));
      await this.setRecLastName(recruiterLastName);
      await this.setRecMail(recruiterEmail);
      await this.clickRecAddButton();
    }
    if ('Active' === status) {
      const gin = await RandomDataGenerator.generateNumber(6);
      await this.txtGINNumber.fill(String(gin));
    }

  }

  async setTitle(title: string) {
    await this.drpTitle.selectOption({ label: title });
  }

  async setLastName(value: string) {
    await this.lastName.fill(value);
  }

  async setFirstName(value: string) {
    await this.firstName.fill(value);
  }

  async setGender(gender: string) {
    await this.drpGender.selectOption({ label: gender });
  }

  async setMaritalStatus(value: string) {
    await this.drpMaritalStatus.selectOption({ label: value });
  }

  async setDOB(value: string) {
    // e.g., "19-Jul-1990" — align with your app’s accepted format
    await this.dateOfBirth.fill(value);
  }
  async setCompany(company: string) {
    await this.drpCompany.click();
    await this.drpCompany.selectOption({ label: company });
    await this.page.mouse.click(0, 0);    // Click outside (trigger UI logic)
    await this.page.waitForFunction(() => {
      const select = document.querySelector('#ctl00_MedtrackContentPlaceHolder_ddlGeoMarket') as HTMLSelectElement;
      return select && select.options.length > 1;
    });

    if (company === "bp International Limited" || company === "bp USA") {
      await this.setGeoMarket('Highest');
      await this.setAdditionalInfo();
    }
  }
  async setPriEmail(email: string) {
    await this.primaryEmail.type(email);
  }

  async setSeconEmail(email: string) {
    await this.secondaryEmail.fill(email);
  }

  async setEmpCategory(value: string) {
    await this.waitForPageToSettle();
    await this.empCategory.scrollIntoViewIfNeeded();
    await this.empCategory.fill(value);
  }

  async setPostalCode() {
    await this.txtPostalCode.click(); // mirrors Selenium: clear + click (some UIs attach onFocus handlers)
  }

  async setCity() {
    await this.txtCity.click();
  }

  async setRecLastName(value: string) {
    await this.recLastName.scrollIntoViewIfNeeded();
    await this.recLastName.fill(value);
  }

  async setRecMail(value: string) {
    await this.recEmail.fill(value);
  }

  async clickRecAddButton() {
    await this.recAddButton.click();
    await this.waitForLoaderToDisappear();
  }

  async setCountry(value: string) {
    await this.drpCountry.selectOption({ label: value });
  }

  async dateOfDeployment(value: string) {
    await this.txtDateOfDeployment.fill(value);
  }

  async setAssignCountry(value: string) {
    await this.drpAssignCountry.selectOption({ label: value });
  }

  async setGeoMarket(value: string) {
    await this.drpGeoMarket.waitFor({ state: 'visible' });
    const options = await this.drpGeoMarket.locator('option').allTextContents();
    await this.drpGeoMarket.selectOption({ label: value });
  }
  async setBusinessArea(value: string) {
    await this.drpBusinessArea.selectOption({ label: value });
  }

  async setSituation(value: string) {
    await this.drpGeoMarket.scrollIntoViewIfNeeded();
    await this.drpSituation.selectOption({ label: value });
  }

  async setAdditionalInfo() {
    await this.waitForPageToSettle();
    await this.drpGeoMarket.scrollIntoViewIfNeeded();

    await this.drpEmployeeAccompanied.selectOption({ label: 'No' });
    await this.drpOGUKRequired.selectOption({ label: 'Yes' });
    await this.drpTBScreeningRequired.selectOption({ label: 'Yes' });
    await this.drpTrainingHubRequired.selectOption({ label: 'No' });
  }

  async clickSubmit() {
    await this.waitForPageToSettle();
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  /**
   * Returns the message text and whether it was success.
   * Mirrors your Selenium check on .SuccessBg / .ErrorBg containers.
   */
  async getCreationOutcome(): Promise<{ isSuccess: boolean; text: string }> {
    await this.waitForPageToSettle();
    const box = this.successOrErrorAlert.first();
    await box.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
    const text = (await box.textContent())?.trim() ?? '';
    const isSuccess = /success/i.test(text) || /has been successfully created/i.test(text);
    return { isSuccess, text };
  }

  async expectCreationSucceeded() {
    const { isSuccess, text } = await this.getCreationOutcome();
    expect.soft(isSuccess, `Creation outcome: ${text}`).toBeTruthy();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Best-effort utility that mirrors WaitUtils.waitForPageLoad + loader dismissal.
   * Update the loader selector(s) to your actual spinner if you have one.
   */
  async waitForPageToSettle() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle').catch(() => { });
    await this.waitForLoaderToDisappear();
  }

  async waitForLoaderToDisappear() {
    const loader = this.page.locator('.loading, .loader, #loader, .ajax-loader');
    if (await loader.first().isVisible().catch(() => false)) {
      await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
    }
  }

  getEmployeeIdFromUrl(): string | null {
    try {
      const u = new URL(this.page.url());
      return u.searchParams.get('id');
    } catch {
      return null;
    }
  }
}
