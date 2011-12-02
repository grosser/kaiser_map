class Doctor < ActiveRecord::Base
  def geocode!
    loc = GeoKit::Geocoders::GoogleGeocoder.geocode(address)
    if loc.success
      self.lng = loc.lng
      self.lat = loc.lat
    end
    save!
  end
end
