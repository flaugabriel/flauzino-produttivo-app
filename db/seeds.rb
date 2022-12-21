# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'i18n'

100.times do
  Equipment.create(
    name: Faker::Name.name,
    description: Faker::Book.title,
    code: Faker::Number.number(digits: 5),
    mark: Faker::Appliance.brand,
    type_equipment: Faker::Number.within(range: 0..5)
  )
end

50.times do
  Place.create(name: Faker::Game.title)
end
