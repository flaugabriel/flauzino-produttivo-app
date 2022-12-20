class Equipment < ApplicationRecord
  enum status: %w[ar_condicionado cafeteria computador monitor mouse teclado]

  validates :name, uniqueness: { message: 'deve ser unico' }
  validates :code, uniqueness: { message: 'deve ser unico' }
  validates_uniqueness_of :name, :code
  validates_presence_of :name, :code, :mark, :type_equipment
end
