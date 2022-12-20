Rails.application.routes.draw do
  resources :places
  namespace :api do
    namespace :v1 do
      resources :equipments
    end
  end
end
