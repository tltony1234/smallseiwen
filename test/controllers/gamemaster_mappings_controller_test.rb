require 'test_helper'

class GamemasterMappingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gamemaster_mapping = gamemaster_mappings(:one)
  end

  test "should get index" do
    get gamemaster_mappings_url
    assert_response :success
  end

  test "should get new" do
    get new_gamemaster_mapping_url
    assert_response :success
  end

  test "should create gamemaster_mapping" do
    assert_difference('GamemasterMapping.count') do
      post gamemaster_mappings_url, params: { gamemaster_mapping: { gamemaster_exp: @gamemaster_mapping.gamemaster_exp, gamemaster_hp: @gamemaster_mapping.gamemaster_hp, gamemaster_item: @gamemaster_mapping.gamemaster_item, gamemaster_level: @gamemaster_mapping.gamemaster_level, gamemaster_name: @gamemaster_mapping.gamemaster_name, gamemaster_percent: @gamemaster_mapping.gamemaster_percent, master_money: @gamemaster_mapping.master_money } }
    end

    assert_redirected_to gamemaster_mapping_url(GamemasterMapping.last)
  end

  test "should show gamemaster_mapping" do
    get gamemaster_mapping_url(@gamemaster_mapping)
    assert_response :success
  end

  test "should get edit" do
    get edit_gamemaster_mapping_url(@gamemaster_mapping)
    assert_response :success
  end

  test "should update gamemaster_mapping" do
    patch gamemaster_mapping_url(@gamemaster_mapping), params: { gamemaster_mapping: { gamemaster_exp: @gamemaster_mapping.gamemaster_exp, gamemaster_hp: @gamemaster_mapping.gamemaster_hp, gamemaster_item: @gamemaster_mapping.gamemaster_item, gamemaster_level: @gamemaster_mapping.gamemaster_level, gamemaster_name: @gamemaster_mapping.gamemaster_name, gamemaster_percent: @gamemaster_mapping.gamemaster_percent, master_money: @gamemaster_mapping.master_money } }
    assert_redirected_to gamemaster_mapping_url(@gamemaster_mapping)
  end

  test "should destroy gamemaster_mapping" do
    assert_difference('GamemasterMapping.count', -1) do
      delete gamemaster_mapping_url(@gamemaster_mapping)
    end

    assert_redirected_to gamemaster_mappings_url
  end
end
