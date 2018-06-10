// export default {
//     name: 'IntensityModal',
//     data () {
//       return {
//         intensity: 0
//       }
//     },
//     methods: {
//       openModal () {
//         this.$modal.show({
//           template: `<b>Label {{labelNumber}}</b>`,
//           props: ['labelNumber']
//         }, {
//           labelNumber: 1,//this.labelNumber,
//         }, {
//           width: 50,
//           height: 50
//         }, {
//           'before-open': this.beforeOpen,
//           'before-close': this.beforeClose
//         })
//       },
//       beforeOpen (event) {
//         console.log(event)
//         // Set the opening time of the modal
//         this.time = Date.now()
//       },
//       beforeClose (event) {
//         console.log(event)
//         // If modal was open less then 5000 ms - prevent closing it
//         if (this.time + this.duration < Date.now()) {
//           event.stop()
//         }
//       }
//     }
//   }