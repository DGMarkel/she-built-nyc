class RankingSerializer < ActiveModel::Serializer
  attributes :id, :ranking
  belongs_to :user
  belongs_to :proposal
end
