class Ranking < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  validates_uniqueness_of :user_id, :scope => :proposal_id
  validates :ranking, :inclusion => { :in => 1..5 }
  scope :oldest_first, -> { order(created_at: :asc)}
  scope :newest_first, -> { order(created_at: :desc)}
  scope :highest_ranking, -> { order(ranking: :desc).limit(3)}

  def created_today?
    Date.today.day == self.created_at.day
  end

  def self.created_today
    all.select{|ranking| ranking if ranking.created_today?}
  end

end
