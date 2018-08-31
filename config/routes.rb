Rails.application.routes.draw do
  get '/ratings/update'
	get '/articles/sort'
	get '/articles/favourite'

  resources :articles do
  	resources :comments
  end
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  root "articles#index"

  post :search, to: 'articles#search'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
