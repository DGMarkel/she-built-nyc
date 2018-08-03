class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  default_scope { order ('created_at DESC')}
  validates :content, presence: true

  #def oldest_first
  #end

  #def newest_first
  #end
end
