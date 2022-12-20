require 'rails_helper'

describe 'PUT /api/v1/equipment/:id' do
  let(:equipment) { FactoryBot.create(:equipment) }

  it 'updates a question' do
    @equipment_name = Faker::Name.unique.name
    put "/api/v1/equipments/#{equipment.id}", params: { equipment: { name: @equipment_name } }

    expect(response.status).to eq(200)
    expect(Equipment.find(equipment.id).name).to eq(@equipment_name)
  end
end
