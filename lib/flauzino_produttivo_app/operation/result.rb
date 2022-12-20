# this base for operations services
class FlauzinoProduttivoApp
  attr_reader :errors

  def initialize
    @errors = []
    @data = {}
  end

  def success?
    errors.empty?
  end

  def failure?
    !success?
  end

  def break!
    throw :break
  end

  def abort!(error_key, error_args)
    add_error_i18n(error_key, error_args)
    break!
  end

  alias error! abort!

  def add_error(msg)
    errors << msg
  end

  def add_error_i18n(error_key, error_args = {})
    errors << { error_key:, error_args: }
  end

  def translated_errors
    errors.map do |err|
      if err.is_a?(String)
        err
      else
        I18n.t(err[:error_key]) % translate_args(err[:error_args])
      end
    end
  end

  def translate_args(args)
    args.map { |k, v| [k, I18n.t(v.to_sym)] }.to_h
  end

  def assign(key, value)
    @data[key] = value
    value
  end

  def data
    @data.dup
  end
end
