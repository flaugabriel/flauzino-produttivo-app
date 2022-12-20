class EquipamentsController < ApplicationController
  before_action :set_equipament, only: %i[ show update destroy ]

  # GET /equipaments
  def index
    @equipaments = Equipament.all

    render json: @equipaments
  end

  # GET /equipaments/1
  def show
    render json: @equipament
  end

  # POST /equipaments
  def create
    @equipament = Equipament.new(equipament_params)

    if @equipament.save
      render json: @equipament, status: :created, location: @equipament
    else
      render json: @equipament.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /equipaments/1
  def update
    if @equipament.update(equipament_params)
      render json: @equipament
    else
      render json: @equipament.errors, status: :unprocessable_entity
    end
  end

  # DELETE /equipaments/1
  def destroy
    @equipament.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_equipament
      @equipament = Equipament.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def equipament_params
      params.require(:equipament).permit(:code, :name, :mark, :type_equipament, :description)
    end
end
