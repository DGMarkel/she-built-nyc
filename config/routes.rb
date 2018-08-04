Rails.application.routes.draw do

  root 'sessions#welcome'
  get '/auth/facebook/callback' => 'users#create'
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
  delete '/logout' => 'sessions#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
