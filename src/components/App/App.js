Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

export default {
    name: 'app',
    data () {
      return {
        labelIndex: 0, 
        technicalObjects: []
      }
    },
    methods: {
        initMap() {
            var myLatLng = {lat: 50.45466, lng: 30.5238};
          
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 11,
              center: myLatLng
            });

            var self = this;
          
            // This event listener calls addMarker() when the map is clicked.
            google.maps.event.addListener(map, 'click', function(event) {
              self.addMarker(event.latLng, map);
            });
        },
        addMarker(location, map) {
            var label = (++this.labelIndex).toString();
            
            var marker = new google.maps.Marker({
              position: location,
              label: label,
              draggable: true,
              map: map
            });

            this.technicalObjects.push({
                location,
                label
            });

            var self = this;
            google.maps.event.addListener(marker, 'rightclick', function(event) {
                marker.setMap(null);
                self.technicalObjects.removeIf((item, index) => item.label == marker.label);
            });
        }
    },
    mounted() {
        this.initMap();
    }
}