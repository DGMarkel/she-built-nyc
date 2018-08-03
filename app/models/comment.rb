class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  validates :content, presence: true
  scope :oldest_first, -> { order(created_at: :asc)}
  scope :newest_first, -> { order(created_at: :desc)}

end
