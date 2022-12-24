class Api::V1::PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :equipments, :ancestry

  def ancestry
    object.ancestry.nil? ? nil : object.ancestry.split('/').last.to_i
  end

  def title
    object.name || ''
  end

  def equipments
    object.equipments.map { |equipment| equipment.name }.join(', ')
  end

  private

  def fetch_locales
    object.descendants.arrange_serializable { |parent, children| Api::V1::PlaceAncestrySerializer.new(parent, children: children) }
  end
end
