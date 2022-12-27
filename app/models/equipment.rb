class Equipment < ApplicationRecord
  has_one_attached :image
  enum type_equipment: %w[ar_condicionado cafeteira computador monitor mouse teclado]
  belongs_to :place

  validates :name, uniqueness: { message: 'deve ser unico', only: :create }
  validates :code, uniqueness: { message: 'deve ser unico', only: :create }
  validates_presence_of :name, :code, :mark, :type_equipment
  validates :code, numericality: { less_than_or_equal_to: 1000000, only_integer: true }
  validate :image_file

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  private

  def image_file
    return unless image.present?

    return image.blob.content_type.include?('jpeg') || image.blob.content_type.include?('png') || image.blob.content_type.include?('jpg')

    errors.add(:image, 'formato permitido apenas jpeg, png ou jpg')
  end
end
