class Ranking < ApplicationRecord
  belongs_to :user
  belongs_to :proposal

  validates_uniqueness_of :user_id, :scope => :proposal_id

end
