require 'rails_helper'

RSpec.describe 'Equipment', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:my_equipment) { FactoryBot.create(:equipment) }

      before do
        post '/api/v1/equipments', params:
                          { equipament: {
                            code: my_equipment.code,
                            name: my_equipment.name,
                            mark: my_equipment.mark,
                            type_equipament: my_equipment.type_equipament
                          } }
      end

      it 'returns the code' do
        expect(json['code']).to eq(my_equipment.code)
      end

      it 'returns the name' do
        expect(json['name']).to eq(my_equipment.name)
      end

      it 'returns the mark' do
        expect(json['mark']).to eq(my_equipment.mark)
      end

      it 'returns the content' do
        expect(json['type_equipment']).to eq(my_equipment.type_equipament)
      end

      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      before do
        post '/api/v1/posts', params:
                          { equipment: {
                            name: '',
                            code: '',
                            makr: '',
                            type: nil,
                            content: ''
                          } }
      end

      it 'returns a unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end