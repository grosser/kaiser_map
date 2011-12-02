class AddDoctors < ActiveRecord::Migration
  def self.up
    create_table :doctors do |t|
      t.string :address, :name, :url, :image_url
      t.decimal  "lat", :precision => 3, :scale => 10
      t.decimal  "lng", :precision => 3, :scale => 10
      t.timestamps
    end
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration
  end
end
