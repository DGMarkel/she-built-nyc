class RepliesController < ApplicationController
  before_action :site_security

  def create
    Reply.create(content: params[:reply][:content], user_id: current_user.id, comment_id: params[:reply][:comment])
  end

  def edit
    @reply = Reply.find_by(id: params[:id])
    @comment = Comment.find_by(id: @reply.comment_id)
    @proposal = Proposal.find_by(id: @comment.proposal_id)
  end

  def update
    @reply = Reply.find_by(id: params[:id])
    if @reply.update(content: params[:reply][:content])
      redirect_to user_comments_path(@reply.comment.user)
    else
      flash[:reply_warning] = "Reply must have content."
      redirect_to edit_reply_path(@reply)
    end
  end

  def destroy
    @reply = Reply.find_by(id: params[:id])
    @comment = Comment.find_by(id: @reply.comment_id)
    @user = @reply.user
    @reply.destroy
    redirect_to proposal_path(@comment.proposal)
  end

end
