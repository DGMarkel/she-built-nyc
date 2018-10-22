class SessionsController < ApplicationController
  before_action :site_security, only: [:destroy]

  def welcome
    @proposals = Proposal.all
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
      redirect_to root_path
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

end
