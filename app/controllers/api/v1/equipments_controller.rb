class Api::V1::EquipmentsController < ApplicationController
  before_action :set_equipment, only: %i[show update destroy aggregate_to_place]

  def index
    equipments = Equipment.order('updated_at desc')

    return json_error_response('Não foi encontrado equipamentos', :not_found) unless equipments.present?

    render json: equipments, each_serializer: Api::V1::EquipmentSerializer, status: :ok
  end

  def show
    return json_error_response("Não foi encontrado o equipamento pelo id #{params[:id]}", :not_found) unless @equipment.present?

    render json: @equipment, each_serializer: Api::V1::EquipmentSerializer, status: :ok
  end

  def create
    equipment = Equipment.new(equipment_params)

    if equipment.save
      render json: { messenger: 'Cadastro realizado', equipment: equipment }, status: :created
    else
      render json: { messenger: equipment.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def aggregate_to_place
    if @equipment.update(equipment_params)
      render json: { messenger: 'Atualizado com successo!', equipment: @equipment }, status: :ok
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @equipment.update(equipment_params)
      render json: { messenger: 'Atualizado com successo!', equipment: @equipment }, status: :ok
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @equipment.destroy
  end

  private

    def set_equipment
      @equipment = Equipment.find(params[:id])
    end

    def equipment_params
      params.require(:equipment).permit(:code, :name, :mark, :type_equipment, :description, :place_id)
    end
end
