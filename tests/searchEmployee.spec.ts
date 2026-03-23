import { test, expect } from '@playwright/test';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';

test(`Search Employee and view exam, @sanity`, async ({ page }) => {

  const searchEmployeePage = new SearchEmployeePage(page);

  // Go directly to Search Employee page (already logged in)
  await page.goto('/employee/searchEmployee.aspx');

  console.log('** User is on search employee page **');

  await searchEmployeePage.setFirstName('Automation');
  await searchEmployeePage.setLastName('BP');
  await searchEmployeePage.setGIN('7915');

  await searchEmployeePage.clickSearch();
  await searchEmployeePage.showSearchResults();
  await searchEmployeePage.verifyRecordExist('7915');
  await searchEmployeePage.clickRadioButton();
  await searchEmployeePage.clickViewExam();

 // await expect(page).toHaveURL(/MedicalExamInformation/i);

  console.log('** User is on Medical Exam Information Page **');

});