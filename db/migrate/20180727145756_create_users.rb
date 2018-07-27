class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :affiliation
      t.string :borough
      t.integer :zip_code
      t.boolean :admin

      t.timestamps
    end
  end
end
