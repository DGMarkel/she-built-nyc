class AddUserIdToProposals < ActiveRecord::Migration[5.2]
  def change
    add_column :proposals, :user_id, :integer
  end
end
