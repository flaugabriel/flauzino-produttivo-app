class Equipament < ApplicationRecord
  enum status: %w[ar_condicionado cafeteria computador monitor mouse teclado]

  validates :name, uniqueness: { message: 'deve ser unico' }
  validates_uniqueness_of :name
  validates_presence_of :name, only: :create
  accepts_nested_attributes_for :addresses
end
