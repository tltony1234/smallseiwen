require "application_system_test_case"

class LvMappingsTest < ApplicationSystemTestCase
  setup do
    @lv_mapping = lv_mappings(:one)
  end

  test "visiting the index" do
    visit lv_mappings_url
    assert_selector "h1", text: "Lv Mappings"
  end

  test "creating a Lv mapping" do
    visit lv_mappings_url
    click_on "New Lv Mapping"

    fill_in "Lv", with: @lv_mapping.lv
    fill_in "Lv all", with: @lv_mapping.lv_all
    fill_in "Lv up", with: @lv_mapping.lv_up
    click_on "Create Lv mapping"

    assert_text "Lv mapping was successfully created"
    click_on "Back"
  end

  test "updating a Lv mapping" do
    visit lv_mappings_url
    click_on "Edit", match: :first

    fill_in "Lv", with: @lv_mapping.lv
    fill_in "Lv all", with: @lv_mapping.lv_all
    fill_in "Lv up", with: @lv_mapping.lv_up
    click_on "Update Lv mapping"

    assert_text "Lv mapping was successfully updated"
    click_on "Back"
  end

  test "destroying a Lv mapping" do
    visit lv_mappings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Lv mapping was successfully destroyed"
  end
end
