class CreateRankings < ActiveRecord::Migration[5.2]
  def change
    create_table :rankings do |t|
      t.integer :user_id
      t.integer :proposal_id
      t.integer :ranking

      t.timestamps
    end
  end
end
