<script setup lang="ts">
import axios from 'axios'

const ip: string = process.env.VUE_APP_IP || "http://apiarchiback.francecentral.cloudapp.azure.com";
let id  = ""

async function onSubmit() {
  await axios.delete(ip + '/pin/' + parseInt(id)).catch((error) => {
    console.log(error)
  })
}
</script>

<template>
  <h2>Delete pin</h2>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="id">Id du pin</label>
      <input v-model="id" type="text" class="form-control" placeholder="Id" />
    </div>
    <input type="submit" value="Submit" />
  </form>
</template>
