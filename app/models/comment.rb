class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  validates :content, presence: true
  default_scope { order ('created_at DESC')}


  #def oldest_first
  #end

  #def newest_first
  #end
end
