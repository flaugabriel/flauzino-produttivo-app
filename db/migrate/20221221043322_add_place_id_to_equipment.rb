class AddPlaceIdToEquipment < ActiveRecord::Migration[7.0]
  def change
    add_reference :equipment, :place, null: true, foreign_key: true
  end
end
