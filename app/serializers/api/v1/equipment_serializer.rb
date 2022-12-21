class Api::V1::EquipmentSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :mark, :type_equipment, :description, :place

  def type_equipment
    object.type_equipment || ''
  end

  def place
    object.place || 0
  end
end
