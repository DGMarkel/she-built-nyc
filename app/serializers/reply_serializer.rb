class ReplySerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :user, :created_at, :updated_at
  belongs_to :user
end
