# frozen_string_literal: true
class Api::V1::PlacesController < ApplicationController
  before_action :set_place, only: %i[show update destroy build_ancestry]

  def index
    places = Place.order('created_at asc')

    return json_error_response('Não foi encontrado locais', :not_found) unless places.present?

    render json: places, status: :ok
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
      render json: { messenger: place.errors.full_messages.to_sentence, status: 422 }
    end
  end

  def build_ancestry
    new_place = @place.children.new(place_params)
    if new_place.save
      render json: { messenger: "Local vinculado em #{@place.name}", place: new_place }, status: :created
    else
      render json: { messenger: new_place.errors.full_messages.to_sentence, status: 422 }
    end
  end

  def update
    if @place.update(place_params)
      render json: { messenger: 'Atualizado com successo!', place: @place }, status: :ok
    else
      render json: { messenger: @place.errors.full_messages.to_sentence, status: 422 }
    end
  end

  def destroy
    if @place.equipments.present?
      render json: { messenger: 'Existe equipamentos neste local, remova antes!', status: 422 }
    else
      @place.destroy
    end
  end

  private

  def set_place
    if params[:id].to_i.zero?
      render json: { messenger: 'Local não encontrado', status: 422 }
    else
      @place = Place.find(params[:id])
    end
  end

  def place_params
    params.require(:place).permit(:id, :name)
  end
end
