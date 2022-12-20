class EquipamentSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :mark, :type_equipament, :description
end
