class CommentsController < ApplicationController
  before_action :site_security, only: [:new, :create, :destroy]

  def index
    @comments = Comment.all
    @user = User.find_by(id: params[:user_id])
    @proposal = Proposal.find_by(id: params[:proposal_id])
  end

  def show
    @comment = Comment.find_by(id: params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    if params[:comment][:comment_id]
      @comment = Comment.new(content: params[:comment][:content], user_id: current_user.id, proposal_id: params[:comment][:proposal_id].to_i)
      c = Comment.find_by(id: params[:comment][:proposal_id])
      c.replies << @comment
      if !@comment.save
        flash[:warning] = "Comment must have content"
      else
        redirect_to proposal_path(params[:comment][:proposal_id].to_i)
      end
    else
      @comment = Comment.new(content: params[:comment][:content], user_id: current_user.id, proposal_id: params[:comment][:proposal].to_i)
      if !@comment.save
        flash[:warning] = "Comment must have content"
      else
        redirect_to proposal_path(params[:comment][:proposal].to_i)
      end
    end
  end

  def reply
    render 'new'
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
