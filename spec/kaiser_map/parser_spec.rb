require 'spec_helper'

describe KaiserMap::Parser do
  it "finds doctors" do
    results = KaiserMap::Parser.parse(zip)
    results.size.should > 10
    results.first[:lat].should be_within(2).of(200)
    results.first[:lng].should be_within(2).of(200)
    results.first[:address].size.should > 10
    results.first[:image_url].should =~ /^http/
    results.first[:name].should.size.should > 10
  end
end
