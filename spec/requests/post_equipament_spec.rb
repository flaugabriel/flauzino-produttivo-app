require 'rails_helper'

RSpec.describe 'Equipament', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:my_equipament) { FactoryBot.create(:equipament) }

      before do
        post '/api/v1/equipaments', params:
                          { equipament: {
                            code: my_equipament.code,
                            name: my_equipament.name,
                            mark: my_equipament.mark,
                            type_equipament: my_equipament.type_equipament
                          } }
      end

      it 'returns the code' do
        expect(json['code']).to eq(my_equipament.code)
      end

      it 'returns the name' do
        expect(json['name']).to eq(my_equipament.name)
      end

      it 'returns the mark' do
        expect(json['mark']).to eq(my_equipament.mark)
      end

      it 'returns the content' do
        expect(json['type_equipament']).to eq(my_equipament.type_equipament)
      end

      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      before do
        post '/api/v1/posts', params:
                          { equipament: {
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