import Map from './../map/map.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

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
    components: {
        Map
    },
    data () {
      return {
        isRepairShops: false,

        technicalObjects: [],
        repairShops: [],

        technicalObjectsColumns: ['number', 'lat', 'lng', 'intensity'],
        technicalObjectsOptions: {
          filterable: false,
          pagination: false,
          texts: {
            count:''
          }
        },
        repairShopsColumns: ['number', 'lat', 'lng'],
        repairShopsOptions: {
          filterable: false,
          pagination: false,
          texts: {
            count:''
          }
        }
      }
    },
    methods: {
      changeIntensity(event, number) {
        var index = this.technicalObjects.findIndex(function(element){
          return element.number == number
        });

        if (index < 0) {
          console.error("changing intensities failed")
        }

        this.technicalObjects[index].intensity = parseFloat(event.currentTarget.value)
      },
      refreshNumbers(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].number = i + 1
        }
      }
    },
    mounted() {
      this.$on('technicalObjects_added', function(object) {
        this.technicalObjects.push(object);
      })

      this.$on('technicalObjects_dragged', function(object) {
        var index = this.technicalObjects.findIndex(function(element){
          return element.number == object.number
        });
        if (index < 0) {
          console.error("dragging event handling failed")
        }
        else {
          object.intensity = this.technicalObjects[index].intensity
          this.technicalObjects.splice(index, 1, object)
        }
      })

      this.$on('technicalObjects_removed', function(number) {
        this.technicalObjects.removeIf((item, index) => item.number == number)
        this.refreshNumbers(this.technicalObjects)
      })



      this.$on('repairShops_added', function(object) {
        this.repairShops.push(object);
      })

      this.$on('repairShops_dragged', function(object) {
        var index = this.repairShops.findIndex(function(element){
          return element.number == object.number
        });
        if (index < 0) {
          console.error("dragging event handling failed")
        }
        else {
          this.repairShops.splice(index, 1, object)
        }
      })

      this.$on('repairShops_removed', function(number) {
        this.repairShops.removeIf((item, index) => item.number == number)
        this.refreshNumbers(this.repairShops)
      })
    }
}