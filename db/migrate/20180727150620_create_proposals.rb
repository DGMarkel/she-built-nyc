class CreateProposals < ActiveRecord::Migration[5.2]
  def change
    create_table :proposals do |t|
      t.string :name
      t.text :description
      t.text :pitch
      t.string :image_url

      t.timestamps
    end
  end
end
