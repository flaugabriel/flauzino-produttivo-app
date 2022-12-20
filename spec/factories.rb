FactoryBot.define do
  factory :place do
    name { Faker::Name.unique.name }
  end

  factory :equipment do
    code { Faker::Number.number(digits: 5) }
    name { Faker::Name.unique.name }
    mark { Faker::Types.rb_string }
    type_equipment { Faker::Number.within(range: 0..5) }
    description { Faker::Lorem.paragraph_by_chars(number: 210) }
  end
end
