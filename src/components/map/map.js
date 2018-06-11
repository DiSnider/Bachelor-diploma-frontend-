export default {
    data () {
      return {
        technicalObjectMarkers: [],
        repairShopMarkers: []
      }
    },
    props: {
        isRepairShops: Boolean
    },
    methods: {
        initMap() {
            var myLatLng = { lat: 50.45466, lng: 30.5238 };
          
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
                var label = (this.technicalObjectMarkers.length + 1).toString();
            
                var marker = new google.maps.Marker({
                  position: location,
                  label: label,
                  draggable: true,
                  map: map
                });
                this.technicalObjectMarkers.push(marker);

                this.$parent.$emit('technicalObjects_added', {
                    position: {
                        lat: location.lat(),
                        lng: location.lng()
                    },
                    label
                });
    
                var self = this;
                google.maps.event.addListener(marker, 'rightclick', function(event) {
                    marker.setMap(null);
                    self.$parent.$emit('technicalObjects_removed', marker.label);
                    self.technicalObjectMarkers.removeIf((item, index) => item.label == marker.label);
                    self.refreshLabels(self.technicalObjectMarkers);
                });
                google.maps.event.addListener(marker, 'dragend', function() {
                    self.$parent.$emit('technicalObjects_dragged', {
                        label: marker.label,
                        position: {
                            lat: marker.getPosition().lat(),
                            lng: marker.getPosition().lng()
                        }
                    });
                });
            }
            else {
                var label = (this.repairShopMarkers.length + 1).toString();
            
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

                this.$parent.$emit('repairShops_added', {
                    position: {
                        lat: location.lat(),
                        lng: location.lng()
                    },
                    label
                });
    
                var self = this;
                google.maps.event.addListener(marker, 'rightclick', function(event) {
                    marker.setMap(null);
                    self.$parent.$emit('repairShops_removed', marker.label);
                    self.repairShopMarkers.removeIf((item, index) => item.label == marker.label);
                    self.refreshLabels(self.repairShopMarkers);
                });
                google.maps.event.addListener(marker, 'dragend', function() {
                    self.$parent.$emit('repairShops_dragged', {
                        label: marker.label,
                        position: {
                            lat: marker.getPosition().lat(),
                            lng: marker.getPosition().lng()
                        }
                    });
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