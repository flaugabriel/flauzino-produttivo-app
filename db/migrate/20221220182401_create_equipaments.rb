class CreateEquipaments < ActiveRecord::Migration[7.0]
  def change
    create_table :equipaments do |t|
      t.integer :code
      t.string :name
      t.string :mark
      t.integer :type_equipament
      t.text :description

      t.timestamps
    end
  end
end
