class Api::V1::EquipmentSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :code, :name, :mark, :type_equipment, :description, :place, :image_url

  def image_url
    object.image.attached? ? rails_blob_url(object.image) : ''
  end

  def type_equipment
    object.type_equipment.titleize || ''
  end

  def place
    object.place || 0
  end
end
