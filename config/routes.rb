Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }


  root 'sessions#welcome'
  resources :sessions
  resources :comments
  resources :rankings
  resources :proposals
  resources :proposals do
    resources :comments, only: [:index]
  end
  resources :users
  resources :users do
    resources :comments, only: [:index]
  end
  resources :replies
  resources :proposals do
    resources :comments, only: [:show] do
      resources :replies, only: [:new, :create]
    end
  end
  delete '/logout' => 'sessions#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
