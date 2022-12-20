require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FlauzinoProduttivoApp
  class Application < Rails::Application
    config.i18n.default_locale = 'pt-BR'
    config.time_zone = 'La Paz'
    config.active_record.default_timezone = :local
    Time::DATE_FORMATS[:default] = '%d/%m/%Y %H:%M'
    Date::DATE_FORMATS[:default] = '%d/%m/%Y'
    config.paths.add(Rails.root.join('lib').to_s, eager_load: true)
    config.autoload_paths += %W[#{config.root}/lib]
    config.load_defaults 7.0
    config.api_only = true
  end
end
