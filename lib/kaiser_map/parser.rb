module KaiserMap::Parser
  def self.parse(zip)
    def log(x)
      File.open('xxx.html','w'){|f| f.write x }
    end

    agent = Mechanize.new

    # login
    search = agent.post 'https://mydoctor.kaiserpermanente.org/cyd/nonMemberSearch.action';nil
    form = search.form('searchForm');nil
    form.zipcode = zip
    form.radiobuttons_with(:name => 'speciality')[0].check # Adult medicine
    form.distance = '1' # 15 miles
    results = agent.submit form;nil
    puts results.body

  end
end
