require 'test_helper'

class LvMappingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lv_mapping = lv_mappings(:one)
  end

  test "should get index" do
    get lv_mappings_url
    assert_response :success
  end

  test "should get new" do
    get new_lv_mapping_url
    assert_response :success
  end

  test "should create lv_mapping" do
    assert_difference('LvMapping.count') do
      post lv_mappings_url, params: { lv_mapping: { lv: @lv_mapping.lv, lv_all: @lv_mapping.lv_all, lv_up: @lv_mapping.lv_up } }
    end

    assert_redirected_to lv_mapping_url(LvMapping.last)
  end

  test "should show lv_mapping" do
    get lv_mapping_url(@lv_mapping)
    assert_response :success
  end

  test "should get edit" do
    get edit_lv_mapping_url(@lv_mapping)
    assert_response :success
  end

  test "should update lv_mapping" do
    patch lv_mapping_url(@lv_mapping), params: { lv_mapping: { lv: @lv_mapping.lv, lv_all: @lv_mapping.lv_all, lv_up: @lv_mapping.lv_up } }
    assert_redirected_to lv_mapping_url(@lv_mapping)
  end

  test "should destroy lv_mapping" do
    assert_difference('LvMapping.count', -1) do
      delete lv_mapping_url(@lv_mapping)
    end

    assert_redirected_to lv_mappings_url
  end
end
