class User < ApplicationRecord
  has_one :proposal
  validates :name, uniqueness: true #um....how am I going to deal with multiple users with the same name?
  has_secure_password
end
