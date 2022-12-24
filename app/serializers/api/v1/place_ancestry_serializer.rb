class Api::V1::PlaceAncestrySerializer < ActiveModel::Serializer
  attributes :id, :title, :children

  def title
    object.name || ''
  end

  def equipments
    object.equipments.map { |equipment|
      {
        id: equipment.id,
        code: equipment.code,
        title: equipment.name,
        mark: equipment.mark,
        type_equipment: equipment.type_equipment
      }
    }
  end

  def children
    instance_options[:children]
  end
end
