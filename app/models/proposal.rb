class Proposal < ApplicationRecord
  has_many :comments
  has_many :rankings
  belongs_to :user, optional: true
  has_many :voters, through: :rankings, source: "user"
  validates :name, uniqueness: true

  def created_today?
    Date.today.day == self.created_at.day
  end

  def self.created_today
    all.select{|proposal| proposal if proposal.created_today?}
  end

  def count
    self.rankings.count
  end

  def rankings_sum
    sum = 0
    self.rankings.each {|ranking| sum += ranking.ranking}
    sum
  end

  def number_of_votes
    sum = 0
    self.rankings.each {|ranking| sum += 1}
    sum
  end

  def rankings_average
    if rankings_sum != 0
      rankings_sum/count
    end
  end

  def self.top_three_proposals
    hash = {}
    all.each {|proposal| hash[proposal] = proposal.rankings_average if proposal.rankings_average && proposal.rankings.count > 1 }
    hash = hash.sort_by {|k,v| v}.reverse[0..2]
  end

  def self.winning_proposal
    top_three_proposals.max {|a,b| a[0].number_of_votes <=> b[0].number_of_votes }
  end

end
