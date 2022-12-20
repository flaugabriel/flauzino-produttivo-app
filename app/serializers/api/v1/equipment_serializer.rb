class Api::V1::EquipmentSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :mark, :type_equipment, :description
end
