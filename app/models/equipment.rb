class Equipment < ApplicationRecord
  enum type_equipment: %w[ar_condicionado cafeteira computador monitor mouse teclado]
  belongs_to :place, optional: true

  validates :name, uniqueness: { message: 'deve ser unico', only: :create }
  validates :code, uniqueness: { message: 'deve ser unico', only: :create }
  validates_presence_of :name, :code, :mark, :type_equipment
  validates :code, numericality: { less_than_or_equal_to: 1000000, only_integer: true }
end
