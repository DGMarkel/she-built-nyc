class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :user, :proposal 
  belongs_to :user
  belongs_to :proposal
  has_many :replies
end
