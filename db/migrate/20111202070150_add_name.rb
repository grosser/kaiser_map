class AddName < ActiveRecord::Migration
  def self.up
    add_column :doctors, :zip, :string
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
