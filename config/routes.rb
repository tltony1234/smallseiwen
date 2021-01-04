Rails.application.routes.draw do
  resources :teams
  devise_for :users
  resources :gamemaster_mappings
  resources :lv_mappings
  resources :job_mappings
  resources :keyword_mappings
	get '/wsw/boss2',to:'wsw#boss2'
	get '/wsw/main',to:'wsw#main'
	get '/wsw/rule',to:'wsw#rule'
  post '/wsw/webhook',to:'wsw#webhook'
  

  resources :push_messages, only: [:new, :create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
