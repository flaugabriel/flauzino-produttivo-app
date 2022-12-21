class Api::V1::PlaceAncestrySerializer < ActiveModel::Serializer
  attributes :id, :name, :salas

  def salas
    instance_options[:children]
  end
end
