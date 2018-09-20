class RankingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :proposal_id, :ranking
  belongs_to :user
  belongs_to :proposal
end
