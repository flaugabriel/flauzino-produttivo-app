# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Equipment', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:my_equipment) { FactoryBot.create(:equipment) }

      before do
        Equipment.delete_all
        post '/api/v1/equipments', params:
                          { equipment: {
                            code: my_equipment.code,
                            name: my_equipment.name,
                            mark: my_equipment.mark,
                            type_equipment: my_equipment.type_equipment
                          } }
      end

      it 'returns a created status' do
        expect(response.status).to eq(201)
        expect(json['equipment'].present?).to eq(true)
      end
    end

    context 'with invalid parameters' do
      before do
        post '/api/v1/equipments', params:
                          { equipment: {
                            name: '',
                            code: '',
                            makr: '',
                            type: nil,
                            content: ''
                          } }
      end

      it 'returns a unprocessable entity status 422' do
        expect(json['status']).to eq(422)
        expect(json['messenger'].present?).to eq(true)
      end
    end
  end
end
