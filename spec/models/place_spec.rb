# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Place, type: :model do
  let(:place) { FactoryBot.create(:place) }

  it 'all params is valid' do
    expect(place).to be_valid
  end

  describe 'validations' do 
    subject { FactoryBot.create(:place) }
    it { should validate_presence_of(:name) }
  end
end
