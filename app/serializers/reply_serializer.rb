class ReplySerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at
  belongs_to :user, serializer: CommentUserSerializer
end
