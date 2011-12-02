# encoding: UTF-8

module KaiserMap
  module Parser
    def self.parse(zip)
      parse_pages(all_pages(zip))
    end

    def self.parse_pages(pages)
      pages.map do |page|
        page.search('.doctorInfo').map do |doctor|
          parse_doctor(doctor)
        end
      end.flatten(2)
    end

    def self.parse_doctor(doctor)
      {
        :name => doctor.search('.title').text,
        :url => (doctor.search('.learnMore').first['href'] rescue nil),
        :address => doctor.search('.mt5').text.gsub("\302\240",' ').gsub(/\s+/,' '),
        :image_url => doctor.search('img').first['src']
      }
    end

    def self.all_pages(zip)
      agent = Mechanize.new

      # login
      agent.post 'https://mydoctor.kaiserpermanente.org/cyd/nonMemberSearch.action'
      page = agent.post 'https://mydoctor.kaiserpermanente.org/cyd/nonMemberSearch.action'
      form = page.form 'searchForm'

      # post initial search values
      first = agent.post 'https://mydoctor.kaiserpermanente.org/cyd/ajaxNonMemberSearchResults.action',
        "distance" =>	"1",
        "kaiserKey" => form.kaiserKey,
        "location" => "",
        "securityKey" => form.securityKey,
        "speciality" => "MED", # Adult medicine
        "zipcode" => zip

      # get all pages
      per_page = 10
      pages = first.body.match(/of\s+(\d+)/)[1].to_i / per_page
      pages = Array.new(pages + 1)

      Parallel.map_with_index(pages, :in_threads => 4) do |page, index|
        page = index + 1
        random = "0.#{9999999999999999}"
        agent.get "https://mydoctor.kaiserpermanente.org/cyd/ajaxLoadSearchResults.action?pageAction=&pageNumber=#{page}&securityKey=#{form.securityKey}&sid=#{random}"
      end
    end
  end
end
