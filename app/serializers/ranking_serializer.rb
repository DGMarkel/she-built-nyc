class RankingSerializer < ActiveModel::Serializer
  attributes :id, :ranking, :created_at, :user, :proposal 
  belongs_to :user
  belongs_to :proposal
end
