class CreateRemindMappings < ActiveRecord::Migration[5.2]
  def change
    create_table :remind_mappings do |t|
      t.string :remind
      t.string :channel_id
      t.string :time

      t.timestamps
    end
  end
end
