// general:
// get cluster_maker.js
// add RS.MAP.key = "YOUR GOOGLE MAPS API KEY" to your page
// make a <div id="canvas" style="width: 600px; height: 600px"></div>
// add a images/loading.gif

// for a dynamic map:
// add RS.MAP.start_point = [lat, lng] to your script
// add RS.MAP.data = [[ID, lat, lng]]
// call RS.MAP.start('dynamic')

// for a picker:
// you need all required input fields
// call RS.MAP.start('picker')

RS = {}
RS.MAP = {}

JS={extend:function(a,b){b=b||{};for(var c in b){if(a[c]===b[c])continue;a[c]=b[c]}return a},makeFunction:function(){return function(){return this.initialize?(this.initialize.apply(this,arguments)||this):this}},makeBridge:function(a){var b=function(){};b.prototype=a.prototype;return new b},delegate:function(a,b){return function(){return this[a][b].apply(this[a],arguments)}},bind:function(){var a=JS.array(arguments),b=a.shift(),c=a.shift()||null;return function(){return b.apply(c,a.concat(JS.array(arguments)))}},callsSuper:function(a){return a.SUPER===undefined?a.SUPER=/\bcallSuper\b/.test(a.toString()):a.SUPER},mask:function(a){var b=a.toString().replace(/callSuper/g,'super');a.toString=function(){return b};return a},array:function(a){if(!a)return[];if(a.toArray)return a.toArray();var b=a.length,c=[];while(b--)c[b]=a[b];return c},indexOf:function(a,b){for(var c=0,d=a.length;c<d;c++){if(a[c]===b)return c}return-1},isFn:function(a){return a instanceof Function},ignore:function(a,b){return/^(include|extend)$/.test(a)&&typeof b==='object'}};JS.Module=JS.makeFunction();JS.extend(JS.Module.prototype,{initialize:function(a,b){b=b||{};this.__mod__=this;this.__inc__=[];this.__fns__={};this.__dep__=[];this.__res__=b._1||null;this.include(a||{})},define:function(a,b,c){c=c||{};this.__fns__[a]=b;if(JS.Module._0&&c._0&&JS.isFn(b))JS.Module._0(a,c._0);var d=this.__dep__.length;while(d--)this.__dep__[d].resolve()},instanceMethod:function(a){var b=this.lookup(a).pop();return JS.isFn(b)?b:null},include:function(a,b,c){if(!a)return c&&this.resolve();b=b||{};var d=a.include,f=a.extend,e,g,j,h,i=b._4||this;if(a.__inc__&&a.__fns__){this.__inc__.push(a);a.__dep__.push(this);if(b._2)a.extended&&a.extended(b._2);else a.included&&a.included(i)}else{if(b._5){for(h in a){if(JS.ignore(h,a[h]))continue;this.define(h,a[h],{_0:i||b._2||this})}}else{if(typeof d==='object'){e=[].concat(d);for(g=0,j=e.length;g<j;g++)i.include(e[g],b)}if(typeof f==='object'){e=[].concat(f);for(g=0,j=e.length;g<j;g++)i.extend(e[g],false);i.extend()}b._5=true;return i.include(a,b,c)}}c&&this.resolve()},includes:function(a){if(Object===a||this===a||this.__res__===a.prototype)return true;var b=this.__inc__.length;while(b--){if(this.__inc__[b].includes(a))return true}return false},ancestors:function(a){a=a||[];for(var b=0,c=this.__inc__.length;b<c;b++)this.__inc__[b].ancestors(a);var d=(this.__res__||{}).klass,f=(d&&this.__res__===d.prototype)?d:this;if(JS.indexOf(a,f)===-1)a.push(f);return a},lookup:function(a){var b=this.ancestors(),c=[],d,f,e;for(d=0,f=b.length;d<f;d++){e=b[d].__mod__.__fns__[a];if(e)c.push(e)}return c},make:function(a,b){if(!JS.isFn(b)||!JS.callsSuper(b))return b;var c=this;return function(){return c.chain(this,a,arguments)}},chain:JS.mask(function(c,d,f){var e=this.lookup(d),g=e.length-1,j=c.callSuper,h=JS.array(f),i;c.callSuper=function(){var a=arguments.length;while(a--)h[a]=arguments[a];g-=1;var b=e[g].apply(c,h);g+=1;return b};i=e.pop().apply(c,h);j?c.callSuper=j:delete c.callSuper;return i}),resolve:function(a){var a=a||this,b=a.__res__,c,d,f,e;if(a===this){c=this.__dep__.length;while(c--)this.__dep__[c].resolve()}if(!b)return;for(c=0,d=this.__inc__.length;c<d;c++)this.__inc__[c].resolve(a);for(f in this.__fns__){e=a.make(f,this.__fns__[f]);if(b[f]!==e)b[f]=e}}});JS.ObjectMethods=new JS.Module({__eigen__:function(){if(this.__meta__)return this.__meta__;var a=this.__meta__=new JS.Module({},{_1:this});a.include(this.klass.__mod__);return a},extend:function(a,b){return this.__eigen__().include(a,{_2:this},b!==false)},isA:function(a){return this.__eigen__().includes(a)},method:function(a){var b=this,c=b.__mcache__=b.__mcache__||{};if((c[a]||{}).fn===b[a])return c[a].bd;return(c[a]={fn:b[a],bd:JS.bind(b[a],b)}).bd}});JS.Class=JS.makeFunction();JS.extend(JS.Class.prototype=JS.makeBridge(JS.Module),{initialize:function(a,b){var c=JS.extend(JS.makeFunction(),this);c.klass=c.constructor=this.klass;if(!JS.isFn(a)){b=a;a=Object}c.inherit(a);c.include(b,null,false);c.resolve();do{a.inherited&&a.inherited(c)}while(a=a.superclass);return c},inherit:function(a){this.superclass=a;if(this.__eigen__){this.__eigen__().include(a.__eigen__?a.__eigen__():new JS.Module(a.prototype));this.__meta__.resolve()}this.subclasses=[];(a.subclasses||[]).push(this);var b=this.prototype=JS.makeBridge(a);b.klass=b.constructor=this;this.__mod__=new JS.Module({},{_1:this.prototype});this.include(JS.ObjectMethods,null,false);if(a!==Object)this.include(a.__mod__||new JS.Module(a.prototype,{_1:a.prototype}),null,false)},include:function(a,b,c){if(!a)return;var d=this.__mod__,b=b||{};b._4=this;return d.include(a,b,c!==false)},extend:function(a){if(!this.callSuper)return;this.callSuper();var b=this.subclasses.length;while(b--)this.subclasses[b].extend()},define:function(){var a=this.__mod__;a.define.apply(a,arguments);a.resolve()},includes:JS.delegate('__mod__','includes'),ancestors:JS.delegate('__mod__','ancestors'),resolve:JS.delegate('__mod__','resolve')});JS.Module=JS.extend(new JS.Class(JS.Module.prototype),JS.ObjectMethods.__fns__);JS.Module.include(JS.ObjectMethods);JS.Class=JS.extend(new JS.Class(JS.Module,JS.Class.prototype),JS.ObjectMethods.__fns__);JS.Module.klass=JS.Module.constructor=JS.Class.klass=JS.Class.constructor=JS.Class;JS.Module.extend({_3:[],methodAdded:function(a,b){this._3.push([a,b])},_0:function(a,b){var c=this._3,d=c.length;while(d--)c[d][0].call(c[d][1]||null,a,b)}});JS.extend(JS,{Interface:new JS.Class({initialize:function(d){this.test=function(a,b){var c=d.length;while(c--){if(!JS.isFn(a[d[c]]))return b?d[c]:false}return true}},extend:{ensure:function(){var a=JS.array(arguments),b=a.shift(),c,d;while(c=a.shift()){d=c.test(b,true);if(d!==true)throw new Error('object does not implement '+d+'()');}}}}),Singleton:new JS.Class({initialize:function(a,b){return new(new JS.Class(a,b))}})});


RS.point = function(lat,lng){
  return new GLatLng(lat, lng);
}

RS.CLUSTERED_MAP = new JS.Class({
  initialize : function(){
    if (!GBrowserIsCompatible())return;
    this.draw_map();
    this.bind_address_field();
    this.go_to_point(new GLatLng(RS.MAP.start_point[0],RS.MAP.start_point[1]));
    if(!RS.MAP.hide_start_marker){this.create_start_marker();}
    this.create_other_markers();
  },

  draw_map : function(){
    this.map = new GMap2(jQuery("#canvas")[0]);
    this.map.addControl(new GLargeMapControl());
    this.map.addControl(new GMapTypeControl());
  },

  create_start_marker : function() {
    this.create_marker(RS.point(RS.MAP.start_point[0],RS.MAP.start_point[1]));
  },

  bind_address_field : function(){
    var self = this;
    var address_field = jQuery('#address_field');
    var address_button = jQuery('#address_button');

    address_field.keydown(function(e){
      if(e.which != 13) return; //enter
      self.go_to_address(address_field.val());
      return false;
    });

    address_button.click(function(){
      self.go_to_address(address_field.val());
      return false;
    });
  },

  go_to_address : function(address){
		var self = this;
	  var geocoder = new GClientGeocoder();
	  geocoder.getLatLng(
	    address,
	    function(point) {
	      if (!point) alert(address + " not found!");
	      else self.go_to_point(point);
      }
    );
	},

  go_to_point : function(point){
    if(!point)alert("NO POINT in got to point");
    var zoom = this.map.getZoom()
    this.map.setCenter(point, RS.MAP.zoom);
    if(zoom) this.map.setZoom(zoom)
  },

  create_marker : function(point){
    this.marker = new GMarker(point, {draggable: true});
    this.map.addOverlay(this.marker);
  },

  create_small_marker : function(point, id) {
    var marker = new GMarker(point, { icon:this.tiny_icon() });
    marker.bindInfoWindowHtml(
      '<ul class="ul_plain" id="inner_info_window" location="'+id+'" style="width:350px;height:100px;overflow:hidden">'+
        '<img src="/images/loading.gif">'+
      '</ul>'
    );
    this.cluster.addMarkers([marker]);
  },

  create_other_markers : function(){
    this.cluster = new ClusterMarker(this.map);
    var self = this;
    //adding a script tag to the info-window does not work in google-chrome (Revision: 2300)
    //so we do it this way...
    GEvent.addListener(this.map,'infowindowopen',function(){
      var $window = jQuery('#inner_info_window');
      var url = "/groups/"+$window.attr('location')+'/info_bubble';
      $window.load(url);
    });
    jQuery.each(RS.MAP.data, function(i,item){
      self.create_small_marker(RS.point(item[1],item[2]),item[0]);
    });
    this.cluster.refresh();
  },

  tiny_icon : function(){
    var tinyIcon = new GIcon();
    tinyIcon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
    tinyIcon.shadow = "http://labs.google.com/ridefinder/images/mm_20_shadow.png";
    tinyIcon.iconSize = new GSize(12, 20);
    tinyIcon.shadowSize = new GSize(22, 20);
    tinyIcon.iconAnchor = new GPoint(6, 20);
    tinyIcon.infoWindowAnchor = new GPoint(5, 1);
    //cache it...
    this.tiny_icon = function(){return tinyIcon;};
    this.tiny_icon();
  }
});

RS.PICKER_MAP = new JS.Class(RS.CLUSTERED_MAP,{
	initialize : function(){
	  if (!GBrowserIsCompatible())return;
		this.draw_map();
    this.bind_data_fields();
    this.bind_address_field();
    this.go_to_point(this.current_location());
		this.show_map();
	},

	bind_data_fields : function(){
	  this.lat = jQuery('#location_latitude');
	  this.lng = jQuery('#location_longitude');
	},

	draw_map : function(){
		this.callSuper();
		var self = this;
	  GEvent.addListener(this.map,"click", function(overlay,point) {
	    self.go_to_point(point);
	  });
	},

	show_map : function(){
		jQuery('#location_picker .static_map').hide();
    jQuery('#location_picker .interactive_map').css('height','auto');
	},

	current_location : function(){
    return new GLatLng(this.lat.val(),this.lng.val());
  },

	move_marker : function(point){
		var self = this;
		if(!this.marker)this.create_marker(point);
		else this.marker.setPoint(point);
	},

	remove_marker : function(){
		if(this.marker)this.map.removeOverlay(this.marker)//remove old marker
	},

	create_marker : function(point){
		this.callSuper();
		var self=this;
    GEvent.addListener(this.marker, "dragend", function(){
      self.go_to_point(self.marker.getPoint())
    });
	},

	store_location : function(point){
	  this.lat.val(point.lat());
	  this.lng.val(point.lng());
  },

	go_to_point : function(point){
    if(!point)return;
		this.callSuper(point);
    this.move_marker(point);
		this.store_location(point);
    this.get_location_name(point, function(name) {
      if(name) jQuery('#address_field').val(name)
    })
	},

  get_location_name: function(point, callback) {
    var latLng = new GLatLng(point.y, point.x)

    new GClientGeocoder().getLocations(latLng, function(response) {
      if (!response || response.Status.code != 200) {
        console.log('response failed')
      } else {
        try {
          var result  = null
            , current = response.Placemark[0]

          $A(['AddressDetails', 'Country', 'AdministrativeArea', 'SubAdministrativeArea', 'Locality', 'LocalityName']).each(function(fieldName) {
            if(current[fieldName]) {
              current = current[fieldName]
              result = current[fieldName + 'Name'] || result
            }
          })

          callback && callback(result)
        } catch(e) {
          console.log(e, response.Placemark[0])
        }
      }
    });
  }
});

//INITIALIZE
RS.MAP.start = function(callback){
	jQuery.getScript("http://maps.google.com/maps?file=api&v=2&key="+RS.MAP.key+"&async=2&callback=initialize_"+callback);
};

initialize_picker = function(){new RS.PICKER_MAP();}
initialize_dynamic = function(){new RS.CLUSTERED_MAP();}
