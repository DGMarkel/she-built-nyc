class UsersController < ApplicationController
  before_action :site_security, only: [:index, :show, :edit, :update, :destroy]

  def index
    if current_user.admin
      @users = User.all
    else
      redirect_to user_path(current_user)
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      render new_user_path
    end
  end

  def edit
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(user_params)
  end

  def destroy
    if current_user.admin
      @user = User.find_by(id: params[:id])
      @user.destroy
      redirect_to users_path
    else
      redirect_to root_path
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :affiliation, :borough, :zip_code, :admin, :password)
    end

  def auth
    request.env['omniauth.auth']
  end

end
