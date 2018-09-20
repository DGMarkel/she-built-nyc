class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :description, :pitch, :user_id, :created_at, :updated_at
end
