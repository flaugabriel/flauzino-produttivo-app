FactoryBot.define do
  factory :equipament do
    code { Faker::Lorem.number}
    name { Faker::Name.unique.name }
    mark { Faker::Types.rb_string}
    type_equipament { Faker::Number.within(range: 0..5) }
    description { Faker::Lorem.paragraph_by_chars(number: 210) }
  end
end