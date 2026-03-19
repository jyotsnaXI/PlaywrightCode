// tests/createEmp.spec.ts
import { test, expect } from '@playwright/test';
import { CreateEmployeePage } from '../pages/CreateEmployeePage';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';
import { utils } from 'xlsx';

test('Create New Employee and verify in Search', async ({ page }) => {
  const createPage = new CreateEmployeePage(page);
  const searchPage = new SearchEmployeePage(page);

  // --- Test Data ---
  const firstName = 'Automation';
  const lastName = 'BP';
  const status = 'Active'; // or 'Pre-employee'
  const title = 'Mr';
  const gender = 'Male';
  const maritalStatus = 'Single';
  const dob = '19-Jul-1990';        // align format to your app
  const company = 'bp International Limited'; // triggers branch in setCompany()
  const gin = '3452345';       // ensure this is unique or handle duplicates in your test logic
  const primaryEmail = 'jyotsna.gupta@internationalsos.com';
  const secondaryEmail = 'jyotsna.gupta@xebia.com';
 // const empCategory = 'Employee';   // adjust if this is a text box or select

  // --- Navigate to Create Employee ---
  await createPage.goto('/employee/createEmployee.aspx'); // adjust if needed
  console.log('** On Create Employee page **');

  // --- Fill the form ---
  await createPage.setEmpStatus(status);        // if 'Pre-employee', it will add recruiter details
  await createPage.setTitle(title);
  await createPage.setFirstName(firstName);
  await createPage.setLastName(lastName);
  await createPage.setGender(gender);
  await createPage.setMaritalStatus(maritalStatus);
  await createPage.setDOB(dob);
  await createPage.setCompany(company);

  if (status === 'Active') {
    await createPage.setGIN(gin);
  } else if (status === 'Pre-employee') {
    // Optionally set Application ID for pre-employee if required by your business flow
    // await createPage.setApplicationID('9003139');
  }

  await createPage.setPriEmail(primaryEmail);
  await createPage.setSeconEmail(secondaryEmail);
 // await createPage.setEmpCategory(empCategory);

  // --- Submit ---
  await createPage.clickSubmit();

  // --- Verify success (or log error) ---
  const outcome = await createPage.getCreationOutcome();
  console.log(`** Creation outcome: ${outcome.text} **`);
  await createPage.expectCreationSucceeded();

  const createdId = createPage.getEmployeeIdFromUrl();
  if (createdId) {
    console.log(`** Employee created with ID: ${createdId} **`);
  }

  // --- Verify via Search page ---
  await page.goto('/employee/searchEmployee.aspx');
  await searchPage.setGIN(String(gin)); // reuse your existing page object
  await searchPage.clickSearch();
  await searchPage.showSearchResults();
  await searchPage.verifyRecordExist(String(gin));

  console.log('** Created employee is visible in Search results **');
});