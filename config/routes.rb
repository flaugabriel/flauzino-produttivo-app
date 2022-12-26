Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :equipments
      resources :places do
        collection do
          put 'build_ancestry/:id', to: 'places#build_ancestry'
        end
      end
    end
  end
end
