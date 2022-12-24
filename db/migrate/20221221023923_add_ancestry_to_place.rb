class AddAncestryToPlace < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :ancestry, :string
    add_index :places, :ancestry
  end
end
