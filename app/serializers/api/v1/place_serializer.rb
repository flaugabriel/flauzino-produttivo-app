class Api::V1::PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :locales, :equipments

  def locales
    object.children.count > 0 ? fetch_locales : []
  end

  def equipments
    object.equipments.map { |equipment|
      {
        id: equipment.id,
        code: equipment.code,
        name: equipment.name,
        mark: equipment.mark,
        type_equipment: equipment.type_equipment
      }
    }
  end

  private

  def fetch_locales
    object.subtree.arrange_serializable { |parent, children| Api::V1::PlaceAncestrySerializer.new(parent, children: children) }
  end
end
