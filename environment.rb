require 'rubygems'
require 'bundler'
Bundler.setup
Bundler.require

require 'logger'
$LOAD_PATH << './lib'
require 'kaiser_map/parser'

if File.exist?('config/newreclic.yml')
  NewRelic::Control.instance.init_plugin(:env => Sinatra::Application.environment.to_s)
end
