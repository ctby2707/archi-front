<template>
  <main>
    <button type="button" class="btn btn-danger" @click="getPins">
      Get pins
    </button>
    <Create></Create>
    <table class="table table-hover" v-if="renderComponent">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Pin Name</th>
          <th scope="col">Longitude</th>
          <th scope="col">Latitude</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pin in pins" :key="pin.id">
          <th scope="row">{{ pin.id }}</th>
          <td>{{ pin.name }}</td>
          <td>{{ pin.longitude }}</td>
          <td>{{ pin.latitude }}</td>
        </tr>
      </tbody>
    </table>
    <Update></Update>
    <Delete></Delete>
  </main>
</template>

<script setup lang="ts">
import Create from "./components/CreatePin.vue";
import Update from "./components/UpdatePin.vue";
import Delete from "./components/DeletePin.vue";
import axios from "axios";
import { nextTick, onMounted, ref } from "vue";

interface Pin {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

const ip: string = process.env.VUE_APP_IP || "http://apiarchiback.francecentral.cloudapp.azure.com";
var pins: Pin[] = [];
const renderComponent = ref(true);

onMounted(async () => {
  await getPins();
  await reload();
});

async function reload() {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
}
async function getPins() {
  const requestData = await axios.get(ip + "/pins");
  pins = requestData.data;
  await reload();
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
