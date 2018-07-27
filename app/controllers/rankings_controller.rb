class RankingsController < ApplicationController

  def new
    @ranking = Ranking.new
  end

  def create
    binding.pry
    @ranking = Ranking.create(user_id: current_user.id, proposal_id: params[:ranking][:proposal], ranking: params[:ranking][:ranking])
    render 'success'
  end


end
