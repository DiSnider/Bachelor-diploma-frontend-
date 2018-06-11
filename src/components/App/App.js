import Map from './../map/map.vue'

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
        repairShops: []
      }
    },
    mounted() {
      this.$on('technicalObjects_added', function(object) {
        this.technicalObjects.push(object);
      })

      this.$on('technicalObjects_dragged', function(object) {
        var index = this.technicalObjects.findIndex(function(element){
          return element.label == object.label
        });
        if (index < 0) {
          console.error("dragging event handling failed")
        }
        else {
          this.technicalObjects.splice(index, 1, object)
        }
      })

      this.$on('technicalObjects_removed', function(label) {
        this.technicalObjects.removeIf((item, index) => item.label == label);
      })



      this.$on('repairShops_added', function(object) {
        this.repairShops.push(object);
      })

      this.$on('repairShops_dragged', function(object) {
        var index = this.repairShops.findIndex(function(element){
          return element.label == object.label
        });
        if (index < 0) {
          console.error("dragging event handling failed")
        }
        else {
          this.repairShops.splice(index, 1, object)
        }
      })

      this.$on('repairShops_removed', function(label) {
        this.repairShops.removeIf((item, index) => item.label == label);
      })
    }
}