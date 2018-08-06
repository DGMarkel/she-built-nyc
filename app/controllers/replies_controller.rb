class RepliesController < ApplicationController
  before_action :site_security

  def new
    @reply = Reply.new
    @comment = Comment.find_by(id: params[:comment_id])
    @proposal = Proposal.find_by(id: params[:proposal_id])
  end

  def create
    @reply = Reply.new(content: params[:reply][:content], user_id: current_user.id, comment_id: params[:reply][:comment])
    @comment = Comment.find_by(id: @reply.comment_id)
    @proposal = Proposal.find_by(id: params[:reply][:proposal])
    if @reply.save
      redirect_to proposal_path(params[:reply][:proposal])
    else
      flash[:reply_warning] = "Reply must have content."
      redirect_to new_proposal_comment_reply_path(@proposal, @comment)
    end
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
