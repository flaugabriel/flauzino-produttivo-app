# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Place', type: :request do
  describe 'POST /create' do
    context 'with valid parameters' do
      let!(:my_place) { FactoryBot.create(:place) }

      before do
        Place.delete_all
        post '/api/v1/places', params: { place: { name: my_place.name } }
      end

      it 'returns a created status' do
        expect(response.status).to eq(201)
      end
    end

    context 'with invalid parameters' do
      before do
        post '/api/v1/places', params: { place: { name: '' } }
      end

      it 'returns a unprocessable entity status' do
        expect(json['status']).to eq(422)
        expect(json['messenger'].present?).to eq(true)
      end
    end
  end
end
