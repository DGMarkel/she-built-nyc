Rails.application.routes.draw do

  root 'sessions#welcome'
  resources :proposals
  resources :users
  resources :sessions
  delete '/logout' => 'sessions#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
