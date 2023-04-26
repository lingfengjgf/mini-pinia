<script setup>
// import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

// const count = ref(0)

import {useCounterStore} from '../store/counter'
const counter = useCounterStore();
</script>

<template>
  <div>{{ counter.count }} - {{ counter.doubleCounter }}</div>
  <div @click="counter.count++">counter.count++</div>
  <div @click="counter.inc()">counter.inc()</div>
  <div @click="counter.$patch({count:counter.count+1})">counter.$patch({count:counter.count+1})</div>
  <div @click="counter.$patch((state)=>state.count++)">counter.$patch((state)=>state.count++)</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
