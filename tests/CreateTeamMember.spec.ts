import { test, expect } from "@playwright/test";
import { Page, Locator } from "@playwright/test";
import { CreateTeamMemberPage } from "../pages/CreateTeamMemberPage";
import { RandomDataGenerator } from "../utils/randomDataGenerator";

test('Create New Team Member', async ({ page }) => {
    const createTeamMemberPage = new CreateTeamMemberPage(page);

    const firstName = RandomDataGenerator.getFirstName();

    await createTeamMemberPage.goto('/UserManagement/CreateUser.aspx'); // adjust if needed
  console.log('** On Create Team Member page **');
   // await createTeamMemberPage.clickSideMenuBarLink();

    // Fill in the form
    await createTeamMemberPage.setUserRole('ISOS Admin'); //ISOS User, Chief Recruiter, Recruiter, ISOS Reviewer, Client Reviewer, Local Doctor, Partner
    await createTeamMemberPage.setTitle('Mr');
    await createTeamMemberPage.setFirstName(firstName);
    await createTeamMemberPage.setLastName('TeamMember');
    await createTeamMemberPage.setDob('01-Jan-1990');
    await createTeamMemberPage.setGender('Male');
    await createTeamMemberPage.setPrimaryEmail('jyotsna.gupta@internationalsos.com');
    await createTeamMemberPage.setUserName('automation' + firstName);
    await createTeamMemberPage.clickSubmit();
});