Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :equipments
      resources :places
    end
  end
end
