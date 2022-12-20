require 'rails_helper'

RSpec.describe Equipment, type: :model do
  let(:equipment) { FactoryBot.create(:equipment) }

  it 'all params is valid' do
    expect(equipment).to be_valid
  end

  describe 'validations' do 
    subject { FactoryBot.create(:equipment) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:code) }
    it { should validate_presence_of(:mark) }
    it { should validate_presence_of(:type_equipment) }
  end
end
