Rails.application.routes.draw do
  resources :articles
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  root "articles#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
