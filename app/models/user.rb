class User < ApplicationRecord
  belongs_to :proposal
  validates :name, uniqueness: true #um....how am I going to deal with multiple users with the same name?
  has_secure_password
end
