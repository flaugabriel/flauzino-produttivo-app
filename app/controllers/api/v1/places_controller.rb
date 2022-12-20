# frozen_string_literal: true
class Api::V1::PlacesController < ApplicationController
  before_action :set_place, only: %i[show update destroy]

  # GET /places
  def index
    places = Place.order('updated_at desc')

    return json_error_response('Não foi encontrado locais', :not_found) unless places.present?

    render json: places, each_serializer: Api::V1::PlaceSerializer, status: :ok
  end

  # GET /places/1
  def show
    return json_error_response("Não foi encontrado o local pelo id #{params[:id]}", :not_found) unless @place.present?

    render json: @place, each_serializer: Api::V1::PlaceSerializer, status: :ok
  end

  # POST /places
  def create
    place = Place.new(place_params)

    if place.save
      render json: { messenger: 'Cadastro realizado', equipment: place }, status: :created
    else
      render json: { messenger: place.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /places/1
  def update
    if @place.update(place_params)
      render json: { messenger: 'Atualizado com successo!', place: @place }, status: :ok
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # DELETE /places/1
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
