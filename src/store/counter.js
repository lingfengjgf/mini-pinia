import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state(){
    return {
      count:1
    }
  },
  getters:{
    doubleCounter(state){
      console.log("doubleCounter state:",state);
      return state.count * 2;
    }
  },
  actions:{
    inc(){
      console.log('inc this:',this);
      this.count++;
    }
  }
})