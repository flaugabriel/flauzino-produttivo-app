
# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Place', type: :request do
  describe 'POST /build_ancestry' do
    context 'when create more locales' do
      let!(:place) { FactoryBot.create(:place) }
      let!(:equipment) { FactoryBot.create(:equipment) }

      before do
        put "/api/v1/places/build_ancestry/#{place.id}", params: { place: { name: 'Setor 1' } }
      end

      it 'when create more locale by current father the locale' do
        expect(response.status).to eq(201)
        expect(json['place'].present?).to eq(true)
      end
    end
  end
end
