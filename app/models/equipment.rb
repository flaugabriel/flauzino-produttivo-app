class Equipment < ApplicationRecord
  enum type_equipment: %w[ar_condicionado cafeteria computador monitor mouse teclado]
  belongs_to :place, optional: true

  validates :name, uniqueness: { message: 'deve ser unico', only: :create }
  validates :code, uniqueness: { message: 'deve ser unico', only: :create }
  validates_presence_of :name, :code, :mark, :type_equipment
end
