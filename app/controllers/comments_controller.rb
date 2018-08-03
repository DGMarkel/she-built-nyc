class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    binding.pry
    @user = User.find_by(id: params[:user_id])
  end

  def show
    @comment = Comment.find_by(id: params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(content: params[:comment][:content], user_id: current_user.id, proposal_id: params[:comment][:proposal].to_i)
    if !@comment.save
      flash[:warning] = "Comment must have content"
    end
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
    @comment = Comment.find_by(id: params[:id])
    @user = @comment.user
    @comment.destroy
    redirect_to user_comments_path(@user)
  end

  private

end
