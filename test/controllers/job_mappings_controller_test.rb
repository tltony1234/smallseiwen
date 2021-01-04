require 'test_helper'

class JobMappingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @job_mapping = job_mappings(:one)
  end

  test "should get index" do
    get job_mappings_url
    assert_response :success
  end

  test "should get new" do
    get new_job_mapping_url
    assert_response :success
  end

  test "should create job_mapping" do
    assert_difference('JobMapping.count') do
      post job_mappings_url, params: { job_mapping: { job_atkpercent: @job_mapping.job_atkpercent, job_cdpercent: @job_mapping.job_cdpercent, job_const: @job_mapping.job_const, job_level: @job_mapping.job_level, job_mame: @job_mapping.job_mame } }
    end

    assert_redirected_to job_mapping_url(JobMapping.last)
  end

  test "should show job_mapping" do
    get job_mapping_url(@job_mapping)
    assert_response :success
  end

  test "should get edit" do
    get edit_job_mapping_url(@job_mapping)
    assert_response :success
  end

  test "should update job_mapping" do
    patch job_mapping_url(@job_mapping), params: { job_mapping: { job_atkpercent: @job_mapping.job_atkpercent, job_cdpercent: @job_mapping.job_cdpercent, job_const: @job_mapping.job_const, job_level: @job_mapping.job_level, job_mame: @job_mapping.job_mame } }
    assert_redirected_to job_mapping_url(@job_mapping)
  end

  test "should destroy job_mapping" do
    assert_difference('JobMapping.count', -1) do
      delete job_mapping_url(@job_mapping)
    end

    assert_redirected_to job_mappings_url
  end
end
