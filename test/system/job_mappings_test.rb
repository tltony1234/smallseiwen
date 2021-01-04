require "application_system_test_case"

class JobMappingsTest < ApplicationSystemTestCase
  setup do
    @job_mapping = job_mappings(:one)
  end

  test "visiting the index" do
    visit job_mappings_url
    assert_selector "h1", text: "Job Mappings"
  end

  test "creating a Job mapping" do
    visit job_mappings_url
    click_on "New Job Mapping"

    fill_in "Job atkpercent", with: @job_mapping.job_atkpercent
    fill_in "Job cdpercent", with: @job_mapping.job_cdpercent
    fill_in "Job const", with: @job_mapping.job_const
    fill_in "Job level", with: @job_mapping.job_level
    fill_in "Job mame", with: @job_mapping.job_mame
    click_on "Create Job mapping"

    assert_text "Job mapping was successfully created"
    click_on "Back"
  end

  test "updating a Job mapping" do
    visit job_mappings_url
    click_on "Edit", match: :first

    fill_in "Job atkpercent", with: @job_mapping.job_atkpercent
    fill_in "Job cdpercent", with: @job_mapping.job_cdpercent
    fill_in "Job const", with: @job_mapping.job_const
    fill_in "Job level", with: @job_mapping.job_level
    fill_in "Job mame", with: @job_mapping.job_mame
    click_on "Update Job mapping"

    assert_text "Job mapping was successfully updated"
    click_on "Back"
  end

  test "destroying a Job mapping" do
    visit job_mappings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Job mapping was successfully destroyed"
  end
end
