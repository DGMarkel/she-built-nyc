class AddProposalIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :proposal_id, :integer
  end
end
