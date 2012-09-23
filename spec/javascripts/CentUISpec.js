describe("Cent UI", function(){

  var CentUI;

  beforeEach(function(){
    // make a div to plop the profiles.
    $('#jasmine_content').append('.profileBlocks');

    CentUI = new Cent.UI({
        "parentContainer": '#jasmine_content',
        "profiles": ".profileBlocks"
      });
  });

  afterEach(function (){
    $('#jasmine_content').empty();
  });

  it("On init, load the data from centinaro.json", function(){
    expect(CentUI.siteContent["kristi"].name).toEqual("Kristi Centinaro");
  });

});