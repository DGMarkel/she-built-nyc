class RepliesController < ApplicationController
  before_action :site_security

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

  def edit
    @reply = Reply.find_by(id: params[:id])
  end

  def update
    @reply = Reply.find_by(id: params[:id])
    @reply.update(content: params[:reply][:content])
    redirect_to user_comments_path(@reply.comment.user)
  end

  def destroy
    @reply = Reply.find_by(id: params[:id])
    @comment = Comment.find_by(id: @reply.comment_id)
    @user = @reply.user
    @reply.destroy
    redirect_to proposal_path(@comment.proposal)
  end

end