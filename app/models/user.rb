class User < ApplicationRecord
  has_one :proposal
  has_many :comments
  has_many :rankings
  has_many :ranked_proposals, through: :rankings, source: "proposal"
  validates :name, uniqueness: true #um....how am I going to deal with multiple users with the same name?
  #need to add attribute validations
  has_secure_password

  def created_today?
    Date.today.day == self.created_at.day
  end

  def self.created_today
    all.select{|user| user if user.created_today?}
  end

end
