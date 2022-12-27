class Api::V1::EquipmentsController < ApplicationController
  before_action :set_equipment, only: %i[show update destroy aggregate_to_place]

  def index
    equipments = Equipment.order('updated_at desc')
    filtered_equipments = Equipments::IndexFilter.new.call(equipments, params)

    return json_error_response('Não foi encontrado equipamentos', :not_found) unless equipments.present?

    render json: filtered_equipments, each_serializer: Api::V1::EquipmentSerializer, status: :ok
  end

  def show
    return json_error_response("Não foi encontrado o equipamento pelo id #{params[:id]}", :not_found) unless @equipment.present?

    render json: @equipment, each_serializer: Api::V1::EquipmentSerializer, status: :ok
  end

  def create
    params[:equipment][:place_id] = params[:equipment][:place_id].nil? ? '' : params[:equipment][:place_id]
    equipment = Equipment.new(equipment_params)
    if equipment.save
      render json: { messenger: 'Cadastro realizado', equipment: equipment }, status: :created
    else
      render json: { messenger: equipment.errors.full_messages.to_sentence, status: 422 }
    end
  end

  def update
    if @equipment.update(equipment_params)
      render json: { messenger: 'Atualizado com successo!', equipment: @equipment }, status: :ok
    else
      render json: { messenger: @equipment.errors.full_messages.to_sentence, status: 422 }
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
    params.require(:equipment).permit(:id, :code, :name, :mark, :type_equipment, :description, :place_id, :image)
  end
end
