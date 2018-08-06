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
    if !current_user.admin && @user.admin
      redirect_to root_path
      flash[:non_admin_warning] = "Permission denied: restricted to admins only"
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
      redirect_to edit_user_path(@user)
    else
      render new_user_path
    end
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
    redirect_to user_path(@user)
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
      params.require(:user).permit(:name, :email, :affiliation, :borough, :zip_code, :admin, :password, :image_url)
    end

  def auth
    request.env['omniauth.auth']
  end

end
