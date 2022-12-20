class CreateEquipments < ActiveRecord::Migration[7.0]
  def change
    create_table :equipments do |t|
      t.integer :code
      t.string :name
      t.string :mark
      t.integer :type_equipment
      t.text :description

      t.timestamps
    end
  end
end
