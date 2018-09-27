class RankingsController < ApplicationController
  before_action :site_security

def index
  @rankings = Ranking.all
  render json: @rankings
end

  def new
    @ranking = Ranking.new
  end

  def create
    @ranking = Ranking.new(user_id: current_user.id, proposal_id: params[:ranking][:proposal], ranking: params[:ranking][:ranking])
    if !@ranking.save
      flash[:ranking_warning] = "Ranking must fall into a range of 1 - 5"
    end
  end

end
