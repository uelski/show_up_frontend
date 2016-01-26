var app = app || {};

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
    options.url = 'http://localhost:3000' + options.url;
  });

app.Bands = Backbone.Collection.extend({
  url: '/bands'
})

app.Band = Backbone.Model.extend({
  urlRoot: '/bands'
})

app.Shows = Backbone.Collection.extend({
  url: '/shows'
})

app.Show = Backbone.Model.extend({
  urlRoot: '/shows'
})

app.Venues = Backbone.Collection.extend({
  url: '/venues'

})

app.Venue = Backbone.Model.extend({
  urlRoot: '/venues'
})

app.ShowBands = Backbone.Collection.extend({
  initialize: function(prop) {
    this.url = prop.url;
  }
})

app.BandShows = Backbone.Collection.extend({
  initialize: function(prop) {
    this.url = prop.url;
  }
})

app.VenueShows = Backbone.Collection.extend({
  initialize: function(prop) {
    this.url = prop.url
  }
})

app.VenueShowsView = Backbone.View.extend({
  el: '.venue-shows',
  initialize: function() {
    var location = window.location.pathname;
    var vid = location.replace('/venue/', '');
    var vurl = '/venue_shows/' + vid
    console.log(vurl);
    this.collection = new app.VenueShows({url: vurl});
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
    console.log(this.collection);
  },
  render: function() {
    this.$el.html('');
    var that = this;
    var shows = this.collection.models;
    console.log(shows);
    for (var i = 0; i < shows.length; i++) {
      app.venueshow = new app.VenueShowView({
        model: shows[i],
        el: that.el
      })
    }
  }
})

app.VenueShowView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#venue-body').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})

app.BandsShowsView = Backbone.View.extend({
  el: '.band-shows',
  initialize: function() {
    var location = window.location.pathname;
    var bid = location.replace('/bands/', '');
    var burl = '/band_shows/' + bid
    console.log(burl);
    this.collection = new app.BandShows({url: burl});
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
    console.log(this.collection);
  },
  render: function() {
    this.$el.html('');
    var that = this;
    var shows = this.collection.models;
    console.log(shows);
    for (var i = 0; i < shows.length; i++) {
      app.bandshow = new app.BandShowsView({
        model: shows[i],
        el: that.el
      })
    }
  }
})

app.BandShowsView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#band-body').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})

app.ShowBandsView = Backbone.View.extend({
  el: '.show-bands',
  initialize: function() {
    var location = window.location.pathname;
    var sid = location.replace('/show/', '');
    var surl = '/show_bands/' + sid
    console.log(surl);
    this.collection = new app.ShowBands({url: surl});
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
    console.log(this.collection);
  },
  render: function() {
    this.$el.html('');
    var that = this;
    var bands = this.collection.models;
    console.log(bands);
    for (var i = 0; i < bands.length; i++) {
      app.showband = new app.ShowBandView({
        model: bands[i],
        el: that.el
      })
    }
  }
})

app.ShowBandView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#show-body').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})



app.ShowList = Backbone.View.extend({
  el: '.listing',
  initialize: function() {
    console.log('initialize shows');
    this.collection = new app.Shows();
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
  },
render: function() {
    this.$el.html('');
    var that = this;
    app.shows = this.collection.models;
    for (var i = 0; i < app.shows.length; i++) {
      console.log(app.shows[i]);
      app.show = new app.ShowView({
        model: app.shows[i],
        el: that.el
      })
    }
  }
});

app.ShowView = Backbone.View.extend({
  initialize: function() {
    console.log('init showview')
    this.template = _.template($('#show-list-template').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    console.log('rendering show');
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})

app.BandList = Backbone.View.extend({
  el: '.band-listing',
  initialize: function() {
    console.log('initialize bands');
    this.collection = new app.Bands();
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
  },
  render: function() {
    this.$el.html('');
    var that = this;
    bands = this.collection.models;
    for (var i = 0; i < bands.length; i++) {
      console.log(bands[i]);
      app.band = new app.BandView({
        model: bands[i],
        el: that.el
      })
    }
  }
})

app.BandView = Backbone.View.extend({
  initialize: function() {
    console.log('init bandview')
    this.template = _.template($('#band-list-template').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    console.log('rendering band');
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})

app.VenueList = Backbone.View.extend({
  el: '.venue-listing',
  initialize: function() {
    console.log('initialize venues');
    this.collection = new app.Venues();
    this.collection.on('sync', this.render, this);
    this.collection.fetch();
  },
  render: function() {
    this.$el.html('');
    var that = this;
    venues = this.collection.models;
    for (var i = 0; i < venues.length; i++) {
      console.log(venues[i]);
      app.venue = new app.VenueView({
        model: venues[i],
        el: that.el
      })
    }
  }
})

app.VenueView = Backbone.View.extend({
  initialize: function() {
    console.log('init venueview')
    this.template = _.template($('#venue-list-template').html());
    var data = this.model.attributes;
    this.render();
  },
  render: function() {
    console.log('rendering venue');
    data = this.model.attributes;
    this.$el.append(this.template(data))
  }
})

app.NewVenueView = Backbone.View.extend({
  el: '.venue-listing',
  events: {
    'submit .new-venue-form': 'saveVenue'
  },
  saveVenue: function(event) {
    var venueDetails = $(event.currentTarget).serializeObject();
    var venue = new app.Venue();
    venue.save(venueDetails, {
      success: function(venue) {
        app.myRouter.navigate('venues', {trigger: true});
      }
    });
    return false;
  },
  render: function(options) {
    var that = this;
    var template = _.template($('#new-venue-template').html());
    that.$el.html(template);
  }
})

app.NewBandView = Backbone.View.extend({
  el: '.band-listing',
  events: {
    'submit .new-band-form': 'saveBand'
  },
  saveBand: function(event) {
    var bandDetails = $(event.currentTarget).serializeObject();
    var band = new app.Band();
    band.save(bandDetails, {
      success: function(band) {
        app.myRouter.navigate('bands', {trigger: true});
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

app.NewShowView = Backbone.View.extend({
  el: '.listing',
  events: {
    'submit .new-show-form': 'saveShow'
  },
  saveShow: function(event) {
    var showDetails = $(event.currentTarget).serializeObject();
    var show = new app.Show();
    show.save(showDetails, {
      success:function(show){
        app.myRouter.navigate('', {trigger:true});
      }
    });
    return false;
  },
  render: function(options) {
    console.log('render new show view')
    var that = this;
    var template = _.template($('#new-show-template').html());
    that.$el.html(template);
  }
})

app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'new':'new',
    'bands':'bands',
    'bands/new':'newband',
    'venues':'venues',
    'venues/new':'newvenue',
    'show/:id' :'showview',
    'bands/:id' : 'bandview',
    'venue/:id' : 'venueview'
      }
    });

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



$(document).ready(function() {



          app.myRouter = new app.Router();
          app.myRouter.on('route:home', function(){
            console.log('router working')
            var showList = new app.ShowList();
            console.log('showlist render?');
          });

          app.myRouter.on('route:new', function(){
            console.log('new show');
            app.newShowView = new app.NewShowView();
            app.newShowView.render();
          })

          app.myRouter.on('route:bands', function(){
            console.log('bands');
            app.bandList = new app.BandList();
          })

          app.myRouter.on('route:newband', function() {
            app.newBandView = new app.NewBandView();
            app.newBandView.render();
          })

          app.myRouter.on('route:venues', function() {
            console.log('venues');
            app.venueList = new app.VenueList();
          })

          app.myRouter.on('route:newvenue', function() {
            app.newVenueVuew = new app.NewVenueView();
            app.newVenueVuew.render();
          })

          app.myRouter.on('route:showview', function() {
            var location = window.location.pathname;
            var sid = location.replace('/show/', '');
            console.log(sid);
            var showModel = new app.Show({id: sid});
            showModel.fetch();
            var showView = new ShowView({el: $('.show-info'), model: showModel});
            var showBandsView = new app.ShowBandsView();
          })

          app.myRouter.on('route:bandview', function() {
            var location = window.location.pathname;
            var bid = location.replace('/bands/', '');
            console.log(bid);
            var bandModel = new app.Band({id: bid});
            bandModel.fetch();
            var bandView = new app.BandShowView({el: $('.band-info'), model: bandModel});
            var bandsShowsView =  new app.BandsShowsView();
          })

          app.myRouter.on('route:venueview', function() {
            var location = window.location.pathname;
            var vid = location.replace('/venue/', '');
            console.log(vid);
            var venueModel = new app.Venue({id: vid});
            venueModel.fetch();
            var venueView = new app.VenueView({el: $('.venue-info'), model: venueModel})
            var venueShowsView = new app.VenueShowsView();
          })



          Backbone.history.start({pushState: true});

          $(function() {
            var bands = new app.Bands();
            var bandSearchList = [];
            bands.fetch({
              success: function(){
                var bandList = bands.pluck('band_name')
                for (var i = 0; i < bandList.length; i++) {
                  bandSearchList.push(bandList[i]);
                }
              }
            });


            $( "#first-band-name" ).autocomplete({
              source: bandSearchList
            });
            $( "#second-band-name" ).autocomplete({
              source: bandSearchList
            });
            $( "#third-band-name" ).autocomplete({
              source: bandSearchList
            });
            $( "#fourth-band-name" ).autocomplete({
              source: bandSearchList
            });
          });


          $(function() {
            var venues = new app.Venues();
            var venueSearchList = [];
            venues.fetch({
              success: function(){
                var venueList = venues.pluck('venue_name')
                for (var i = 0; i < venueList.length; i++) {
                  venueSearchList.push(venueList[i]);
                }
              }
            });


            $( "#new-show-venue" ).autocomplete({
              source: venueSearchList
            });
          });

});// end of document.ready
