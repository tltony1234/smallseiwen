class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :job
      t.string :leader
      t.string :team

      t.timestamps
    end
  end
end
