class UsersController < ApplicationController
  before_action :site_security, only: [:edit, :update, :destroy]

  def index
    @users = User.all
    respond_to do |format|
      format.html { render :index }
      format.json {  render json: @users }
    end

  end

  def show
    @user = User.find_by(id: params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json {  render json: @user }
    end
  end

  def new
    if !logged_in?
      @user = User.new
    else
      redirect_to root_path
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    end

    # else
    #   if @user.errors[:email].any?
    #     if params[:user][:email].empty?
    #       flash[:email_warning] = "You must enter a valid email address to proceed"
    #     else
    #       flash[:email_warning] = "A user with that e-mail already exists"
    #     end
    #   end
    #   if @user.errors[:email].any? && @user.errors[:password].any?
    #     flash[:warning] = "Both fields must be filled in correctly to proceed"
    #   end
    # end
  end

  def edit
    @user = User.find_by(id: params[:id])
    if @user != current_user && !current_user.admin
      redirect_to user_path(current_user)
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(user_params)
    redirect_to root_path
  end

  def destroy
    #this is a really weird feature...should I keep it or not?
    #if an admin deletes a user, that user is blocked from their account
    #BUT a new account is created with all the same attributes and associations

    if current_user.admin
      @user = User.find_by(id: params[:id])
      if @user.proposal
        @proposal = @user.proposal
      end
      @new_user = User.create(name: "#{@user.name} - removed for abusive behavior", email: (0...8).map { (65 + rand(26)).chr }.join, password:Devise.friendly_token[0,20])
      if @user.affiliation
        @new_user.update(affiliation: @user.affiliation)
      end
      if @user.borough
        @new_user.update(borough: @user.borough)
      end
      if @user.zip_code
        @new_user.update(zip_code: @user.zip_code)
      end
      if @user.proposal
        @new_user.update(proposal_id: @proposal.id)
      end
      if !@user.image_url.empty?
        @new_user.update(image_url: @user.image_url)
      end
      @user.rankings.each {|ranking| ranking.update(user_id: @new_user.id)}
      @user.comments.each {|comment| comment.update(user_id: @new_user.id)}
      @user.replies.each {|reply| reply.update(user_id: @new_user.id)}
      if @user.proposal
        @proposal.update(user_id: @new_user.id )
      end
      @user.destroy
      redirect_to users_path
    else
      redirect_to root_path
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :affiliation, :borough, :zip_code, :admin, :password, :image_url)
    end

  def auth
    request.env['omniauth.auth']
  end

end
