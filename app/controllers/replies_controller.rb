class RepliesController < ApplicationController

  def new
    @reply = Reply.new
  end

  def create
    @reply = Reply.new(content: params[:reply][:content], user_id: current_user.id, comment_id: params[:reply][:comment])
    binding.pry
    if @reply.save
      redirect_to propoposal_path(params[:proposal])
    else
      flash[:warning] = "Reply must have content."
    end
  end

end
