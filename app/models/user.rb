class User < ApplicationRecord
  belongs_to :proposal, optional: true
  has_many :rankings
  has_many :ranked_proposals, through: :rankings, source: "proposal"
  validates :name, uniqueness: true #um....how am I going to deal with multiple users with the same name?
  #need to add attribute validations
  has_secure_password
end
