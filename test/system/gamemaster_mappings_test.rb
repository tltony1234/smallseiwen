require "application_system_test_case"

class GamemasterMappingsTest < ApplicationSystemTestCase
  setup do
    @gamemaster_mapping = gamemaster_mappings(:one)
  end

  test "visiting the index" do
    visit gamemaster_mappings_url
    assert_selector "h1", text: "Gamemaster Mappings"
  end

  test "creating a Gamemaster mapping" do
    visit gamemaster_mappings_url
    click_on "New Gamemaster Mapping"

    fill_in "Gamemaster exp", with: @gamemaster_mapping.gamemaster_exp
    fill_in "Gamemaster hp", with: @gamemaster_mapping.gamemaster_hp
    fill_in "Gamemaster item", with: @gamemaster_mapping.gamemaster_item
    fill_in "Gamemaster level", with: @gamemaster_mapping.gamemaster_level
    fill_in "Gamemaster name", with: @gamemaster_mapping.gamemaster_name
    fill_in "Gamemaster percent", with: @gamemaster_mapping.gamemaster_percent
    fill_in "Master money", with: @gamemaster_mapping.master_money
    click_on "Create Gamemaster mapping"

    assert_text "Gamemaster mapping was successfully created"
    click_on "Back"
  end

  test "updating a Gamemaster mapping" do
    visit gamemaster_mappings_url
    click_on "Edit", match: :first

    fill_in "Gamemaster exp", with: @gamemaster_mapping.gamemaster_exp
    fill_in "Gamemaster hp", with: @gamemaster_mapping.gamemaster_hp
    fill_in "Gamemaster item", with: @gamemaster_mapping.gamemaster_item
    fill_in "Gamemaster level", with: @gamemaster_mapping.gamemaster_level
    fill_in "Gamemaster name", with: @gamemaster_mapping.gamemaster_name
    fill_in "Gamemaster percent", with: @gamemaster_mapping.gamemaster_percent
    fill_in "Master money", with: @gamemaster_mapping.master_money
    click_on "Update Gamemaster mapping"

    assert_text "Gamemaster mapping was successfully updated"
    click_on "Back"
  end

  test "destroying a Gamemaster mapping" do
    visit gamemaster_mappings_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Gamemaster mapping was successfully destroyed"
  end
end
