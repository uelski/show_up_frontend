var app = app || {};

$(document).ready(function() {

  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'http://localhost:3000' + options.url;
    });

  var Bands = Backbone.Collection.extend({
    url: '/bands'
  })

  var Band = Backbone.Model.extend({
    url: '/bands'
  })

  var BandList = Backbone.View.extend({
    el: '.band-listing',
    render: function() {
      var that = this;
      var bands = new Bands();
      bands.fetch({
        success: function(bands) {
          var template = _.template($('#band-list-template').html());
          that.$el.html(template({'bands': bands.models}));
        }
      })
    }
  })

  var bandList = new BandList();

  var Shows = Backbone.Collection.extend({
    url: '/shows'
  })

  var Show = Backbone.Model.extend({
    urlRoot: '/shows'
  })

  var ShowList = Backbone.View.extend({
    el: '.listing',
    render: function() {
      var that = this;
      var shows = new Shows();
      shows.fetch({
        success: function(shows) {
          var template = _.template($('#show-list-template').html());
          that.$el.html(template({'shows': shows.models}));
        }
      })
    }
  });

  var NewBandView = Backbone.View.extend({
    el: '.band-listing',
    events: {
      'submit .new-band-form': 'saveBand'
    },
    saveBand: function(event) {
      var bandDetails = $(event.currentTarget).serializeObject();
      var band = new Band();
      band.save(bandDetails, {
        success: function(band) {
          router.navigate('bands', {trigger: true});
        }
      });
      return false;
    },
    render: function(options) {
      var that = this;
      var template = _.template($('#new-band-template').html());
      that.$el.html(template);
    }
  })

  var newBandView = new NewBandView();

  var NewShowView = Backbone.View.extend({
    el: '.listing',
    events: {
      'submit .new-show-form': 'saveShow'
    },
    saveShow: function(event) {
      var showDetails = $(event.currentTarget).serializeObject();
      var show = new Show();
      show.save(showDetails, {
        success:function(show){
          router.navigate('', {trigger:true});
        }
      });
      return false;
    },
    render: function(options) {
      var that = this;
      var template = _.template($('#new-show-template').html());
      that.$el.html(template);
    }
  })

  var newShowView = new NewShowView();


  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'new':'new',
      'bands':'bands',
      'bands/new':'newband'
        }
      });

  var showList = new ShowList();

  var router = new Router();
  router.on('route:home', function(){
    console.log('router working')
    showList.render();
    console.log('showlist render?');
  });

  router.on('route:new', function(){
    console.log('new show');
    newShowView.render();
  })

  router.on('route:bands', function(){
    console.log('bands');
    bandList.render();
  })

  router.on('route:newband', function() {
    newBandView.render();
  })



  Backbone.history.start({pushState: true});




});// end of document.ready

$.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };
