FactoryBot.define do
  factory :place do
    name { Faker::Name.name }
  end

  factory :equipment do
    code { Faker::Computer.rand_in_range(10000, 0) }
    name { Faker::Name.name }
    mark { Faker::Appliance.brand }
    type_equipment { Faker::Number.within(range: 0..5) }
    description { Faker::Computer.stack }

    place { FactoryBot.create(:place)}
  end
end
