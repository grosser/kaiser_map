#!/usr/bin/env ruby
require './environment'
raise "numbers pls" unless ARGV[0] =~ /^\d+$/
data = KaiserMap::Parser.parse(ARGV[0])
puts "found #{data.size} doctors"

data.each do |d|
  doctor = Doctor.find_by_url(d[:image_url]) || Doctor.new
  doctor.update_attributes!(d)
end

