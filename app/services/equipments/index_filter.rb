module Equipments
  class IndexFilter < Generic::IndexFilter
    FILTERS = {
      place_filter: {
        apply?: ->(params) {
          params[:place_filter].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where(place_id: params[:place_filter])
        }
      }.freeze,
      name_filter: {
        apply?: ->(params) {
          params[:name_filter].is_a?(String)
        },
        apply: ->(scope, params) {
          scope.where('name ILIKE ?', "%#{params[:name_filter]}%")
        }
      }.freeze
    }.freeze

    def self.filters
      FILTERS
    end
  end
end
