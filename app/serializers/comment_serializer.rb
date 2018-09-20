class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :proposal_id, :content, :created_at, :updated_at
  belongs_to :user
  belongs_to :proposal
  has_many :replies
end
