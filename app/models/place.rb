class Place < ApplicationRecord
  has_ancestry
  has_many :equipments
  validates :name, uniqueness: { message: 'deve ser unico', only: :create }
  validates_presence_of :name
end
