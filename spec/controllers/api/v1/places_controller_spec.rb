# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PlacesController, type: :controller do
  describe '# GET index' do
    context 'when have list' do
      before do
        FactoryBot.create_list(:place, 10)
        get :index
      end

      it { expect(response.status).to eq(200) }

      it 'when have list of places' do
        expect(json.length).to eq(10)
      end
    end

    context 'when not have list' do
      before do
        get :index
      end

      it { expect(response.status).to eq(200) }

      it 'when not have list of place' do
        expect(json['messenger']).to eq('Não foi encontrado locais')
      end
    end
  end

  describe '# GET show' do
    context 'when find' do
      let(:place) { FactoryBot.create(:place) }

      before do
        get :show, params: { id: place.id }
      end

      it { expect(response.status).to eq(200) }
      it { expect(json['name']).to eq(place.name) }
      it { expect(json.present?).to eq(true) }
    end
  end
end
