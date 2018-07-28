class Ranking < ApplicationRecord
  belongs_to :user
  belongs_to :proposal
  validates_uniqueness_of :user_id, :scope => :proposal_id

  def created_today?
    Date.today.day == self.created_at.day
  end

  def self.created_today
    all.select{|ranking| ranking if ranking.created_today?}
  end

end
