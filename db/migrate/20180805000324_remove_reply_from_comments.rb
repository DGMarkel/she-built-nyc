class RemoveReplyFromComments < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :reply, :boolean
  end
end
