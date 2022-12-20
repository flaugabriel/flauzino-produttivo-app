source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.3"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4"
gem 'active_model_serializers', '~> 0.10.0'
gem "pg", "~> 1.1"
gem 'i18n'
gem 'puma', "~> 5.0"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false
gem "image_processing", "~> 1.2"
gem "rack-cors"

group :development do
  # gem "spring"
end

group :development, :test do
  gem 'rspec-rails'
  gem 'debug', platforms: %i[ mri mingw x64_mingw ]
end

group :test do
  gem 'factory_bot_rails'
  gem 'faker'
end
