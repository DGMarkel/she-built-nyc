class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    @user = User.find_by(id: params[:user_id])
  end

  def show
    @comment = Comment.find_by(id: params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    #@comment = Comment.create(content: params[:comment][:content], user_id: current_user.id, proposal_id: params[:comment][:proposal].to_i)
    @comment = Comment.new(comment_params)
    if @comment.save
      @comment.update(user_id: current_user, proposal_id: params[:comment][:proposal].to_i)
    else
      flash[:warning] = "Your comment must have content."
      binding.pry
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

    def comment_params
      params.require(:comment).permit(:content)
    end

end
