require 'rails_helper'

RSpec.describe 'Equipments', type: :request do
  describe "DELETE /destroy" do
    let!(:equipment) { FactoryBot.create(:equipment) }

    before do
      delete "/api/v1/equipments/#{equipment.id}"
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
