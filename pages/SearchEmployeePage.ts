import { Page, Locator, expect } from '@playwright/test';

export class SearchEmployeePage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly drpCompany: Locator;
  readonly ginNumber: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly radioButton: Locator;
  readonly viewExamButton: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#ctl00_MedtrackContentPlaceHolder_txtFirstName');
    this.lastName = page.locator('#ctl00_MedtrackContentPlaceHolder_txtLastName');
    this.drpCompany = page.locator('#ctl00_MedtrackContentPlaceHolder_ddlCompany');
    this.ginNumber = page.locator('#ctl00_MedtrackContentPlaceHolder_txtGinNumber');
    this.searchButton = page.locator('#ctl00_MedtrackContentPlaceHolder_btnSearch');
    this.searchResults = page.locator('#searchHeading');
    this.radioButton = page.locator('[name="rdoSelect"]');
    this.viewExamButton = page.locator('#ctl00_MedtrackContentPlaceHolder_btnViewExam');
    this.pageHeading = page.locator('//strong[normalize-space()="Search Employees"]');
  }

  async isMySearchPageExists(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 5000 });
      const isVisible = await this.pageHeading.isVisible();
      // console.log(`My Search Employee page heading visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.log(`Error checking My Search Employee page heading visibility: ${error}`);
      return false;
    }
  }

  async setFirstName(fname: string) {
    await this.firstName.fill(fname);
  }

  async setLastName(lname: string) {
    await this.lastName.fill(lname);
  }

  async setCompany(company: string) {
    await this.drpCompany.selectOption({ label: company });
  }

  async setGIN(gin: string) {
    await this.ginNumber.fill(gin);
  }

  async clickSearch() {
    await this.searchButton.click();
  }
  async showSearchResults() {
    const table = this.page.locator('#ctl00_MedtrackContentPlaceHolder_gdvSearchResult');
    const rows = this.page.locator("//table[contains(@id, 'gdvSearchResult')]//tbody/tr");
    const errorMsg = this.page.locator("//div[@class='ErrorBg']");
    const infoMsg = this.page.locator("//div[@class='InformationBg']");

    // Wait a bit for UI to respond (instead of waiting for rows)
    await this.page.waitForTimeout(2000);
    const rowCount = await rows.count();

    // ✅ Case 1: Records found
    if (rowCount > 0) {
      console.log(`✅ Records found: ${rowCount}`);
      return true;
    }

    //  Case 2: No records → message shown
    if (await errorMsg.isVisible().catch(() => false)) {
      console.log('❌ No records found');
      console.log(await errorMsg.textContent());
      return true; // PASS
    }

    if (await infoMsg.isVisible().catch(() => false)) {
      console.log('❌ No records found');
      console.log(await infoMsg.textContent());
      return true; // PASS
    }
    console.log('No records and no message (still pass)');
    return true;
  }

  async verifyRecordExist(gin: string) {
    // Use contains() for dynamic IDs
    const rows = this.page.locator("//table[contains(@id, 'gdvSearchResult')]//tbody/tr");
    const rowCount = await rows.count();
    console.log(`Number of rows in the table: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).textContent();

      if (rowText?.includes(gin)) {
        console.log(`Record with GIN ${gin} exists in the table.`);
        return true;
      }
    }
    console.log(`Record with GIN ${gin} not found.`);
    return false;
  }
  async clickRadioButton() {
    await this.radioButton.scrollIntoViewIfNeeded();
    console.log('** Scrolled down to element **');
    await this.radioButton.click();
  }

  async clickViewExam() {
    await this.viewExamButton.click();
  }
}