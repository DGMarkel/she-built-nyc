class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :description, :pitch, :created_at, :updated_at
  belongs_to :user
  has_many :comments, serializer: CommentSerializer
  has_many :rankings, serializer: ProposalRankingSerializer
end
