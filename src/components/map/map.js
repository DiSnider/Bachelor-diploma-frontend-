Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

export default {
    data () {
      return {
        technicalObjects: [],
        technicalObjectMarkers: [],

        repairShops: [],
        repairShopMarkers: []
      }
    },
    props: {
        isRepairShops: Boolean
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
            if (!this.isRepairShops){ //Items
                var label = (this.technicalObjects.length + 1).toString();
            
                var marker = new google.maps.Marker({
                  position: location,
                  label: label,
                  draggable: true,
                  map: map
                });
                this.technicalObjectMarkers.push(marker);

                this.technicalObjects.push({
                    location,
                    label
                });
    
                var self = this;
                google.maps.event.addListener(marker, 'rightclick', function(event) {
                    marker.setMap(null);
                    self.technicalObjects.removeIf((item, index) => item.label == marker.label);
                    self.technicalObjectMarkers.removeIf((item, index) => item.label == marker.label);
                    self.refreshLabels(self.technicalObjectMarkers);
                });
            }
            else {
                var label = (this.repairShops.length + 1).toString();
            
                var marker = new google.maps.Marker({
                  position: location,
                  label: label,
                  draggable: true,
                  map: map
                });

                marker.setIcon({
                    url: '/src/assets/green-marker.png',
                    labelOrigin: new google.maps.Point(11, 13)
                });
                this.repairShopMarkers.push(marker);

                this.repairShops.push({
                    location,
                    label
                });
    
                var self = this;
                google.maps.event.addListener(marker, 'rightclick', function(event) {
                    marker.setMap(null);
                    self.repairShops.removeIf((item, index) => item.label == marker.label);
                    self.repairShopMarkers.removeIf((item, index) => item.label == marker.label);
                    self.refreshLabels(self.repairShopMarkers);
                });
            }
        },
        refreshLabels(markers) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setLabel((i+1).toString());
            }
        }
    },
    mounted() {
        this.initMap();
    }
}