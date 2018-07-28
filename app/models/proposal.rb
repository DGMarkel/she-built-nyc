class Proposal < ApplicationRecord
  has_many :rankings
  has_many :users, through: :rankings
  validates :name, uniqueness: true

  def count
    self.rankings.count
  end

  def rankings_sum
    sum = 0
    self.rankings.each {|ranking| sum += ranking.ranking}
    sum
  end

  def rankings_average
    rankings_sum/count
  end

  def self.top_three_proposals
  end

end
