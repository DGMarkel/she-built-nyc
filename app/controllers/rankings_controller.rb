class RankingsController < ApplicationController

  def new
    @ranking = Ranking.new
  end

  def create
    @ranking = Ranking.create(user_id: current_user.id, proposal_id: params[:ranking][:proposal], ranking: params[:ranking][:ranking])
    redirect_to proposal_path(params[:ranking][:proposal])
  end


end
