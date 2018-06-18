<template>
  <div id="app">
    <!-- <iframe width="700" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=%D0%9A%D0%B8%D1%97%D0%B2&key=AIzaSyD-D-zOQwtx1-ccQlkBnZ5seI-q9AtNrTQ"></iframe> -->
    
    <modal name="hello-world" v-on:before-open="beforeResultModalOpen">
      hello, world!
    </modal>

    <modals-container />
    <div class="map-container">
      <Map :is-repair-shops="isRepairShops"></Map>

      <div class="paramethers-wrapper">
        <div>
          <label for="repairDuration">Тривалість ремонту (год):</label>
          <input type="number" min="0" step="1" value="0" v-model="repairDuration" id="repairDuration" />
        </div>
        <div>
          <label for="machineSpeed">Швидкість машин (км/год):</label>
          <input type="number" min="0" step="1" value="0" v-model="machineSpeed" id="machineSpeed" />
        </div>
        <div>
          <label for="permissibleIdleTime">Допустима тривалість ремонту (год):</label>
          <input type="number" min="0" step="1" value="0" v-model="permissibleIdleTime" id="permissibleIdleTime" />
        </div>
        <div>
          <label for="permissibleConfirmationDelayTime">Допустимий час підтвердження з бази (год):</label>
          <input type="number" min="0" step="1" value="0" v-model="permissibleConfirmationDelayTime" id="permissibleConfirmationDelayTime" />
        </div>
      </div>

      <div class="buttons-wrapper">
        <toggle-button id="changed-font" v-model="isRepairShops" 
                 :color="{checked: '#4169E1', unchecked: '#228B22'}"
                 :width="180"
                 :height="30"
                 :labels="{checked: 'Ремонтні станції', unchecked: `Об'єкти`}" />
  
        <button class="btn btn-lg btn-success start-simulation" v-on:click="sendRequestToSimulation">Моделювати</button>
        <vue-simple-spinner v-if="spinnerVisible" class="loading-spinner" size="40" :line-size="5"></vue-simple-spinner>
      </div>
    </div>    

    <v-client-table class="my-table" :data="technicalObjects" :columns="technicalObjectsColumns" :options="technicalObjectsOptions">
      <caption slot="afterLimit">
        <h3>Технічні об'єкти</h3>
      </caption>

      <div slot="intensity (per day)" slot-scope="props">
        <input type="number" min="0" step="0.01" value="0.000" @change="changeIntensity($event, props.row.number)" />
      </div>
    </v-client-table>

    <v-client-table class="my-table" :data="repairShops" :columns="repairShopsColumns" :options="repairShopsOptions">
      <caption slot="afterLimit">
        <h3>Ремонтні майстерні</h3>
      </caption>
    </v-client-table>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
