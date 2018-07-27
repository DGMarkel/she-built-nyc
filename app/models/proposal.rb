class Proposal < ApplicationRecord
  has_many :users
  validates :name, uniqueness: true

  def self.top_three_proposals
  end

end
