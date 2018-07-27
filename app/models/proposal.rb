class Proposal < ApplicationRecord
  has_many :rankings
  has_many :users, through: :rankings
  validates :name, uniqueness: true

  def self.top_three_proposals
  end

end
