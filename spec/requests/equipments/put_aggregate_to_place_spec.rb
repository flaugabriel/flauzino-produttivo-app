require 'rails_helper'

describe 'PUT /api/v1/equipment/:id' do
  let(:place) { FactoryBot.create(:place) }
  let(:equipment) { FactoryBot.create(:equipment) }
  
  before do
    @setor = place.children.create(name: 'setor 1')
  end

  it 'when update all atributes' do
    put "/api/v1/equipments/aggregate_to_place/#{equipment.id}", params: { equipment: { place_id: @setor.id } }

    expect(response.status).to eq(200)
    expect(Equipment.find(equipment.id).place.present?).to eq(true)
  end
end
