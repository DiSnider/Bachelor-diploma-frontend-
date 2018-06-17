import Map from './../map/map.vue'
import axiosApi from './../../axios-api'
import { eventHub } from './../../eventHub'
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

        repairDuration: 2,
        machineSpeed: 50,
        permissibleIdleTime: 2.4,
        permissibleConfirmationDelayTime: 1.5,

        technicalObjectsColumns: ['number', 'lat', 'lng', 'intensity (per day)'],
        technicalObjectsOptions: {
          filterable: false,
          pagination: false,
          texts: {
            count:'',
            'intensity (per day)': 'Інтенсивність (за день)'
          }
        },
        repairShopsColumns: ['number', 'lat', 'lng'],
        repairShopsOptions: {
          filterable: false,
          pagination: false,
          texts: {
            count:''
          }
        },

        spinnerVisible: false,
        spinnerLineSize: 5
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

      sendRequestToSimulation() {
        //simple validation
        if (this.technicalObjects.length == 0 || this.repairShops.length == 0) {
          alert('Please set objects and/or repair bases')
          return
        }
        if (this.permissibleIdleTime <= this.repairDuration){
          alert('Permissible idle time cannot be less than repair duration')
          return
        }

        var data = {
          technicalObjects: this.technicalObjects.map(function(e) {
            return {
              lat: e.lat,
              lng: e.lng,
              intensity: e.intensity
            }
          }),
          repairShops: this.repairShops.map(function(e) {
            return {
              lat: e.lat,
              lng: e.lng
            }
          }),
          repairDuration: this.repairDuration,
          machineSpeed: this.machineSpeed,
          permissibleIdleTime: this.permissibleIdleTime,
          permissibleConfirmationDelayTime: this.permissibleConfirmationDelayTime
        }

        axiosApi.post('Simulation/SimulateAndGetResult', data)
          .then((response) => {
            
            if (response.status == 202) {
              alert(response.data)
              return
            }
            else if (response.status == 200) {
              let repairStationsSection = ''
              for (let i = 0; i < response.data.OptimalRepairShopsCountsByStations.length; i++) {
                let shopsCount = response.data.OptimalRepairShopsCountsByStations[i]
                repairStationsSection += `<p>Ремонтна станція #${i+1}: ${shopsCount} машин${shopsCount === 1 ? 'а' : ''}</p>`
              }

              this.$modal.show({
                template: `
                  <div>
                    <h1 style="text-align: center">Результат моделювання</h1>
                    <h2 style="text-align: center">Оптимальні кількості машин для кожної ремонтної станції:</h2>
                    ${repairStationsSection}
                    <p><b>Отримана середня тривалість ремонту: <span style="color: rgb(34, 139, 34)">${response.data.MeanIdleTime} годин</span></b></p>
                    <p><b>Отриманий середній час підтвердження з бази: <span style="color: rgb(34, 139, 34)">${response.data.MeanConfirmationDelayTime} годин</span></b></p>
                  </div>
                `,
                props: []
              }, {
                //text: 'This text is passed as a property'
              }, {
                width: 800,
                height: 'auto'
              })
            }       
          })
          .catch((error) => {
            console.log(error)
            alert('Error!')
          })
      },

      refreshNumbers(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].number = i + 1
        }
      },

      showSpinner() {
        console.log('show spinner');
        this.spinnerVisible = true;
      },
      hideSpinner() {
        console.log('hide spinner');
        this.spinnerVisible = false;
      },

      beforeResultModalOpen(event) {
        console.log(event.params.foo)
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
    },
    created() {
      eventHub.$on('before-request', this.showSpinner);
      eventHub.$on('request-error',  this.hideSpinner);
      eventHub.$on('after-response', this.hideSpinner);
      eventHub.$on('response-error', this.hideSpinner);
    },
    beforeDestroy() {
      eventHub.$off('before-request', this.showSpinner);
      eventHub.$off('request-error',  this.hideSpinner);
      eventHub.$off('after-response', this.hideSpinner);
      eventHub.$off('response-error', this.hideSpinner);
    }
}