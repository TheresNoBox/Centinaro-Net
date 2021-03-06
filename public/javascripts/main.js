// Main JS file for Centinaro.net 
// ==============================

var Cent = Cent || {};


Cent.UI = function(settings){
  var self = this;
  //use jquery to load JSON faux-data file
  $.get('/javascripts/centinaro.json', function(siteContent){
    self.siteContent = siteContent;

    self.renderViews(siteContent, settings);
    Cent.UI.Controller.init(settings.parentContainer);
  });


};


Cent.UI.prototype.renderViews = function (siteContent, settings) {
  this.mainContainer = $(settings.parentContainer);
  this.profileContainer = $(settings.profileContainer);
  this.siteContent = siteContent;
  this.profiles = {};

  for (profile in siteContent.profiles) {
    var profileView = new Cent.ProfileView;
    var profileObj = siteContent.profiles[profile];
    this.profileContainer.append(profileView.render(profileObj));
  }

  this.profileContainer.after('<div class="questions row" />');

  for (question in siteContent.questions) {
    var questionView = new Cent.QuestionView;
    var questionObj = siteContent.questions[question];
    this.mainContainer.find('.questions').append(questionView.render(questionObj));
  }

  this.mainContainer.find('#projectView').append(Handlebars.templates['projectsContainer.tmpl']);

  for (project in siteContent.projects) {
    var projectView = new Cent.ProjectView;
    var projectObj = siteContent.projects[project];
    this.mainContainer.find('#projectView .projects').append(projectView.render(projectObj));
  }


};

// UI Controller - Event binding and connection
// --------------------------------------------
Cent.UI.Controller = {
  init: function (mainContainer) {
    var self = this;
    self.mainContainer = $(mainContainer);
    self.projectBlock = $('#projectView');

    self.bindEvents();
  },

  resizeListener: function(){

    $(window).resize(function(){
      var windowWidth = $(window).width();

    });
  },

  bindEvents: function () {
    var self = this;
    self.mainContainer.delegate('a.projects', 'click', function(){
        self.showProjects($(this));
    });

    // initialize isotope on the projects
    self.projectBlock.find('.projects').isotope({
      itemSelector: ".project",
      layoutMode: "masonry",
      animationOption: 'best-available',
      animationOptions: {
           duration: 750,
           easing: 'linear',
           queue: false
      },
      sortBy: 'random'
    });

    self.projectBlock.delegate('.filters .btn', 'click', function(){
      self.filterProjects($(this)); 
    });

    self.projectBlock.delegate('.close', 'click', function(){
      self.hideProjects($(this));
    });

    // tooltip init for social links.
    self.mainContainer.find('.social-icons a').tooltip();
  },

  showProjects: function (buttonNode) {
    var self = this;
    var containerHeight = self.projectBlock.height();
    // fire isotope before opening the window, to hide
    // any strange stacking effects it likes to do.
    self.filterProjects(buttonNode);

    // prevent unneeded expanding if it's already open.
    if (self.projectBlock.hasClass('expanded') === false) {
      self.projectBlock.show()
        .animate({
        'height': 'auto',
      }, 'linear', function(){
        $(this).css('height', 'auto');
      }).addClass('expanded');
      // refresh isotope after we expand.
      // This fires *almost* at the same time, which looks better.
      self.projectBlock.find('.projects').isotope( 'reLayout' );

      // slide up the hero block for more room.
      self.mainContainer.find('.hero').animate({
        'height': 'auto',
        'padding-top': '0'
      }, 'fast').css('height', 'auto');

      self.mainContainer.find('.hero .sub-head').hide();
      

      $('html,body').animate({
      scrollTop: 0
      }, 1000);
      
    }
  },

  filterProjects: function(node) {
    var self = this;
    var filterName = node.attr('data-filter');
    
    self.projectBlock.find('.filters').find('.btn')
      .removeClass('active');

    if (filterName === 'all') {
      self.projectBlock.find('.filters').find('[data-filter="all"]')
        .addClass('active');

      self.projectBlock.find('.projects').isotope({ filter: '*'});  

    } else {
      self.projectBlock.find('.projects').isotope({ filter: '.'+filterName });  

      self.projectBlock.find('.filters').find('[data-filter="'+filterName+'"]')
        .addClass('active');

    } 
  }, 

  hideProjects: function(node) {
    var self = this;
    var windowWidth = $(window).width();


    self.projectBlock.animate({
      'height': '0'
    }, 300, 'linear', function(){
      $(this).hide();

      self.mainContainer.find('.hero').animate({
        'height': 'auto',
        'padding-top': '40px'
      }, 'fast', function(){
      });
      
      self.mainContainer.find('.hero .sub-head').show();

    }).removeClass('expanded');
  },

  expandProject: function(node) {

  }

};


// UI Views - Powered by Handlebars
// -----------------------------------------

Cent.ProfileView = function(){
  this.template = Handlebars.templates['profile.tmpl'];

  this.render = function(profile){
    return this.template(profile);
  }
};

Cent.QuestionView = function(){
  this.template = Handlebars.templates['questions.tmpl'];

  this.render = function(question){
    return this.template(question);
  }
};

Cent.ProjectView = function(){
  this.template = Handlebars.templates['projects.tmpl'];

  this.render = function(project){
    return this.template(project);
  }
};



