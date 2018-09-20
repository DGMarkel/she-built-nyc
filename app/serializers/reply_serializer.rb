class ReplySerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :user, :comment
  belongs_to :user
  belongs_to :comment

end
