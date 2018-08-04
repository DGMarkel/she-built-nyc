class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  validates :content, presence: true
  scope :oldest_first, -> { order(created_at: :asc)}
  scope :newest_first, -> { order(created_at: :desc)}


  def created_today?
    Date.today.day == self.created_at.day
  end

  def self.created_today
    all.select{|proposal| proposal if proposal.created_today?}
  end

end
