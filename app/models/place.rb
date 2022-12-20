class Place < ApplicationRecord
  validates :name, uniqueness: { message: 'deve ser unico' }
  validates_presence_of :name
end
