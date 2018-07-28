class Proposal < ApplicationRecord
  has_many :rankings
  has_many :users, through: :rankings
  validates :name, uniqueness: true
  #how to ensure that each proposal can only be ranked once by each user?

  def count
    self.rankings.count
  end

  def rankings_sum
    sum = 0
    self.rankings.each {|ranking| sum += ranking.ranking}
    sum
  end

  def rankings_average
    if rankings_sum != 0
      rankings_sum/count
    end
  end

  def self.top_three_proposals
  end

end
