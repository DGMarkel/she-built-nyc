class ProposalRankingSerializer < ActiveModel::Serializer
  attributes :id, :ranking, :user_id, :proposal_id
end
