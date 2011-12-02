require 'spec_helper'

describe KaiserMap::Parser do
  it "finds doctors" do
    results = KaiserMap::Parser.parse(94103)
    results.size.should > 10
    results.first[:address].size.should > 10
    results.first[:image_url].should =~ /^http/
    results.first[:url].should =~ /^http/
    results.first[:name].size.should > 10
  end

  describe :parse_pages do
    it "reads all doctors" do
      html = Nokogiri::HTML(File.read('spec/fixtures/full_page.html'))
      results = KaiserMap::Parser.parse_pages([html])
      results.size.should == 10
      results.first.should == {
        :name=>"Joseph Atkinson, MD",
        :url=>"http://www.kp.org/mydoctor/atkinson?tab=about/professional",
        :address=>" Medicine 2200 O'farrell Street San Francisco,CA 94115 ",
        :image_url=>"https://www.permanente.net/pmdb/photosync/8266130_photoweb.jpg"
      }
    end
  end
end
