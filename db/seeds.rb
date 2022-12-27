# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'i18n'
place_1 = Place.create(name: 'Setor 1')
place_2 = Place.create(name: 'Setor 2')
place_3 = Place.create(name: 'Setor 3')
place_4 = Place.create(name: 'Setor 4')
place_5 = Place.create(name: 'Setor 5')

Equipment.create(
  name: Faker::Name.name,
  description: Faker::Book.title,
  code: Faker::Number.number(digits: 5),
  mark: Faker::Appliance.brand,
  type_equipment: Faker::Number.within(range: 0..5),
  place_id: place_1.id
)

Equipment.create(
  name: Faker::Name.name,
  description: Faker::Book.title,
  code: Faker::Number.number(digits: 5),
  mark: Faker::Appliance.brand,
  type_equipment: Faker::Number.within(range: 0..5),
  place_id: place_2.id
)

Equipment.create(
  name: Faker::Name.name,
  description: Faker::Book.title,
  code: Faker::Number.number(digits: 5),
  mark: Faker::Appliance.brand,
  type_equipment: Faker::Number.within(range: 0..5),
  place_id: place_3.id
)

Equipment.create(
  name: Faker::Name.name,
  description: Faker::Book.title,
  code: Faker::Number.number(digits: 5),
  mark: Faker::Appliance.brand,
  type_equipment: Faker::Number.within(range: 0..5),
  place_id: place_4.id
)

Equipment.create(
  name: Faker::Name.name,
  description: Faker::Book.title,
  code: Faker::Number.number(digits: 5),
  mark: Faker::Appliance.brand,
  type_equipment: Faker::Number.within(range: 0..5),
  place_id: place_5.id
)