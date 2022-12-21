# frozen_string_literal: true
class Api::V1::PlacesController < ApplicationController
  before_action :set_place, only: %i[show update destroy build_ancestry]

  def index
    places = Place.order('updated_at desc')

    return json_error_response('Não foi encontrado locais', :not_found) unless places.present?

    render json: places, each_serializer: Api::V1::PlaceSerializer, status: :ok
  end

  def show
    return json_error_response("Não foi encontrado o local pelo id #{params[:id]}", :not_found) unless @place.present?

    render json: @place, each_serializer: Api::V1::PlaceSerializer, status: :ok
  end

  def create
    place = Place.new(place_params)

    if place.save
      render json: { messenger: 'Cadastro realizado', place: place }, status: :created
    else
      render json: { messenger: place.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def build_ancestry
    if @place.children.create(place_params)
      place = Place.find_by(id: params[:id]).subtree.arrange_serializable { |parent, children| Api::V1::PlaceAncestrySerializer.new(parent, children: children) }

      render json: { messenger: "Local vinculado ao #{@place.name}", place: place }, status: :created
    else
      render json: { messenger: place.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    if @place.update(place_params)
      render json: { messenger: 'Atualizado com successo!', place: @place }, status: :ok
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @place.destroy
  end

  private
  
    # Use callbacks to share common setup or constraints between actions.
    def set_place
      @place = Place.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def place_params
      params.require(:place).permit(:name)
    end
end
