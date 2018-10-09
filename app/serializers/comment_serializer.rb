class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :replies, :proposal, :created_at, :updated_at
  belongs_to :user, serializer: CommentUserSerializer
  has_many :replies
end
