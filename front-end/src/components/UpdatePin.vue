<script setup lang="ts">
import axios from 'axios'

const ip : string = process.env.VITE_IP || "http://localhost:3000"
let id = ""

let name = ''
let longitude = ''
let latitude = ''

async function onSubmit() {
  await axios.put(ip + '/pin', {
    id: parseInt(id),
    name: name,
    longitude: parseFloat(longitude),
    latitude: parseFloat(latitude)
  }).catch((error) => {
    console.log(error)
  })
}
</script>

<template>
  <h2>Update pin</h2>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="id">Id du pin</label>
      <input v-model="id" type="text" class="form-control" placeholder="Id" />
    </div>
    <div class="form-group">
      <label for="name">Nom du pin</label>
      <input v-model="name" type="text" class="form-control" placeholder="Nouveau nom" />
    </div>
    <div class="form-group">
      <label for="longitude">Longitude</label>
      <input v-model="longitude" type="text" class="form-control" placeholder="Longitude" />
    </div>
    <div class="form-group">
      <label for="latitude">Latitude</label>
      <input v-model="latitude" type="text" class="form-control" placeholder="Latitude" />
    </div>
    <input type="submit" value="Submit" />
  </form>
</template>
