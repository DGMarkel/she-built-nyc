class RankingsController < ApplicationController

  def new
    @ranking = Ranking.new
  end

  def create
    @ranking = Ranking.new(user_id: current_user.id, proposal_id: params[:ranking][:proposal], ranking: params[:ranking][:ranking])
    if !@ranking.save
      flash[:warning] = "Ranking must fall into a range of 1 - 5"
    end
    redirect_to proposal_path(params[:ranking][:proposal])
  end


end
