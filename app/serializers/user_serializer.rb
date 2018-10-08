class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :affiliation, :borough, :zip_code, :email, :admin, :created_at, :updated_at
  has_one :proposal
end
