// tests/createEmp.spec.ts
import { test, expect } from '@playwright/test';
import { CreateEmployeePage } from '../pages/CreateEmployeePage';
import { SearchEmployeePage } from '../pages/SearchEmployeePage';
import { utils } from 'xlsx';
import { RandomDataGenerator } from '../utils/randomDataGenerator';

test('Create New Employee', async ({ page }) => {
  const createPage = new CreateEmployeePage(page);
  const searchPage = new SearchEmployeePage(page);

  // --- Test Data ---
  const firstName = 'Automation';
  const lastName = await RandomDataGenerator.getLastName(); // or hardcode for repeatability
  const status = 'Active'; // or 'Pre-employee'
  const title = 'Mr';
  const gender = 'Male';
  const maritalStatus = 'Single';
  const dob = '19-Jul-1990';        // align format to your app
  const company = 'bp International Limited'; // triggers branch in setCompany()
  const applicationId = Number(await RandomDataGenerator.generateNumber(6)); // ensure this is unique or handle duplicates in your test logic
  const gin = Number(await RandomDataGenerator.generateNumber(6));       // ensure this is unique or handle duplicates in your test logic
  const primaryEmail = 'jyotsna.gupta@internationalsos.com';
  const secondaryEmail = 'jyotsna.gupta@xebia.com';
  const city = 'Mumbai';
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
  await createPage.setPriEmail(primaryEmail);
  await createPage.setSeconEmail(secondaryEmail);
  //await createPage.setCity(city);
  //  await createPage.setGIN(gin);
  //  await createPage.setApplicationID(applicationId);
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
});