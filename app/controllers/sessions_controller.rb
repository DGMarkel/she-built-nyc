class SessionsController < ApplicationController
  before_action :site_security, only: [:destroy]

  def welcome
  end

  def new
    if !logged_in?
      render 'login'
    else
      redirect_to root_path
    end
  end

  def create
    user = User.find_by(name: params[:user][:name])
    if user.try(:authenticate, params[:user][:password])
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      flash[:login_warning] = "Please make sure you've filled all fields correctly"
      redirect_to new_session_path
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

end
