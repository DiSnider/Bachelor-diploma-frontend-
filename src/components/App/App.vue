<template>
  <div id="app">
    <!-- <iframe width="700" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=%D0%9A%D0%B8%D1%97%D0%B2&key=AIzaSyD-D-zOQwtx1-ccQlkBnZ5seI-q9AtNrTQ"></iframe> -->
    <!-- <modals-container/> -->
    <Map :is-repair-shops="isRepairShops"></Map>
    <toggle-button id="changed-font" v-model="isRepairShops" 
               :color="{checked: '#4169E1', unchecked: '#228B22'}"
               :width="165"
               :height="30"
               :labels="{checked: 'Repair shops', unchecked: 'Items'}"/>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
