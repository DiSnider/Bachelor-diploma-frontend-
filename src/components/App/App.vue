<template>
  <div id="app">
    <!-- <iframe width="700" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=%D0%9A%D0%B8%D1%97%D0%B2&key=AIzaSyD-D-zOQwtx1-ccQlkBnZ5seI-q9AtNrTQ"></iframe> -->
    <!-- <modals-container/> -->
    <div class="map-container">
      <Map :is-repair-shops="isRepairShops"></Map>
      <toggle-button id="changed-font" v-model="isRepairShops" 
               :color="{checked: '#4169E1', unchecked: '#228B22'}"
               :width="165"
               :height="30"
               :labels="{checked: 'Repair shops', unchecked: 'Objects'}" />
      <button class="btn btn-lg btn-success start-simulation">Start simulation</button>
    </div>

    <v-client-table class="my-table" :data="technicalObjects" :columns="technicalObjectsColumns" :options="technicalObjectsOptions">
      <caption slot="afterLimit">
        <h3>Technical objects</h3>
      </caption>

      <div slot="intensity" slot-scope="props">
        <input type="number" min="0" step="0.01" value="0.000" @change="changeIntensity($event, props.row.number)" />
      </div>
    </v-client-table>

    <v-client-table class="my-table" :data="repairShops" :columns="repairShopsColumns" :options="repairShopsOptions">
      <caption slot="afterLimit">
        <h3>Repair shops</h3>
      </caption>
    </v-client-table>
    <!--<table class="intensities-table">
      <tr><th v-bind:colspan="technicalObjects.length">Intensities of technical objects:</th></tr>
      <tr>
        <td v-for="object in technicalObjects" :key="object.label">{{object.label}}: {{object.position.lat}}-{{object.position.lng}}</td>
      </tr>
    </table>-->
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
