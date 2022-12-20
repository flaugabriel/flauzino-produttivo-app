require 'rails_helper'

RSpec.describe 'Place', type: :request do
  describe "DELETE /destroy" do
    let!(:place) { FactoryBot.create(:place) }

    before do
      delete "/api/v1/places/#{place.id}"
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
