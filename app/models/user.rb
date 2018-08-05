class User < ApplicationRecord
  devise :omniauthable, omniauth_providers: %i[facebook]
  has_one :proposal
  has_many :comments
  has_many :replies
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

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    user.email = auth.info.email
    user.password = Devise.friendly_token[0,20]
    user.name = auth.info.name   # assuming the user model has a name
    user.image_url = auth.info.image # assuming the user model has an image
    # If you are using confirmable and the provider(s) you use validate emails,
    # uncomment the line below to skip the confirmation emails.
    # user.skip_confirmation!
  end
end

end
