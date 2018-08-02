class CommentsController < ApplicationController

  def index
    @comments = Comment.all
  end

  def show
    @comment = Comment.find_by(id: params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.create(content: params[:comment][:content], user_id: current_user.id, proposal_id: params[:comment][:proposal].to_i)
    redirect_to proposal_path(params[:comment][:proposal].to_i)
  end

  def edit
    @comment = Comment.find_by(id: params[:id])
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    @comment.update(comment_params)
    redirect_to comment_path(@comment)
  end

  def destroy
    if current_user.admin
      @comment = Comment.find_by(id: params[:id])
      @comment.destroy
      redirect_to comments_path
    else
      render comment_path(@comment)
    end
  end

  private

end
