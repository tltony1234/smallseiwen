# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_11_081843) do

  create_table "attacks", force: :cascade do |t|
    t.string "user_id"
    t.string "user_name"
    t.string "win"
    t.string "loss"
    t.string "master_hp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "channels", force: :cascade do |t|
    t.string "channel_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "gamemaster_mappings", force: :cascade do |t|
    t.string "gamemaster_hp"
    t.string "gamemaster_exp"
    t.string "gamemaster_item"
    t.string "gamemaster_percent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "channel_id"
    t.string "user_id"
    t.string "user_mp"
    t.string "user_exp"
    t.string "user_weapon"
    t.string "user_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "job_mappings", force: :cascade do |t|
    t.string "job_name"
    t.string "job_atkpercent"
    t.string "jon_cdpercent"
    t.string "job_const"
    t.string "job_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "keyword_mappings", force: :cascade do |t|
    t.string "keyword"
    t.string "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "level_mappings", force: :cascade do |t|
    t.string "lv"
    t.string "lv_up"
    t.string "lv_all"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lv_mappings", force: :cascade do |t|
    t.string "lv"
    t.string "lv_up"
    t.string "lv_all"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "receiveds", force: :cascade do |t|
    t.string "channel_id"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "remind_mappings", force: :cascade do |t|
    t.string "remind"
    t.string "channel_id"
    t.string "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "replies", force: :cascade do |t|
    t.string "channel_id"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skill_mappings", force: :cascade do |t|
    t.string "skill_name"
    t.string "job_name"
    t.string "skill_level"
    t.string "skill_segment"
    t.string "skill_mp"
    t.string "skill_atk"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "job"
    t.string "leader"
    t.string "team"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "templates", force: :cascade do |t|
    t.string "ori_msg"
    t.string "mod_msg"
    t.string "uri"
    t.string "text_msg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
