#!/usr/bin/env ruby
require './environment'
zip = ARGV[0]
raise "numbers pls" unless zip =~ /^\d+$/
data = KaiserMap::Parser.parse(zip)
puts "found #{data.size} doctors"

doctors = data.map do |d|
  doctor = Doctor.find_by_url(d[:image_url]) || Doctor.new
  doctor.update_attributes!(d.merge(:zip => zip))
  doctor
end

puts "Geocoding"

doctors.each do |d|
  d.geocode! unless d.lat
end