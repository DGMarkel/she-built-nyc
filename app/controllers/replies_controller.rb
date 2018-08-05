class RepliesController < ApplicationController

  def new
    @reply = Reply.new
  end

  def create
    @reply = Reply.new(content: params[:reply][:content], user_id: current_user.id, comment_id: params[:reply][:comment])
    if @reply.save
      redirect_to proposal_path(params[:reply][:proposal])
    else
      flash[:warning] = "Reply must have content."
    end
  end

end
