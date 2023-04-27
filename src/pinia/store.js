import { reactive, toRefs, computed, getCurrentInstance, inject } from "vue";
import { piniaSymbol } from "./createPinia";
 
export function defineStore(id, options){

  // 获取参数
  const { state: stateFn, getters, actions } = options;

  const state = reactive(stateFn())

  function useStore(){
    // 获取组件实例
    const currentInstance = getCurrentInstance();

    // 获取pinia实例
    const pinia = currentInstance && inject(piniaSymbol);

    if(!pinia._s.has(id)){
      pinia._s.set(id, reactive({
        ...toRefs(state),
        ...Object.keys(getters || {}).reduce((computedGetters, name) => {
          computedGetters[name] = computed(() => {
            return getters[name].call(store, store)
          });
          return computedGetters
        }, {}),
        ...Object.keys(actions || {}).reduce((wrapperActions, name) => {
          wrapperActions[name] = () => actions[name].call(store);
          return wrapperActions
        }, {}),
        $patch(partialStateOrMutator) {
          if(typeof partialStateOrMutator === 'object'){
            Object.keys(partialStateOrMutator).forEach(key => {
              state[key] = partialStateOrMutator[key];
            })
          } else {
            partialStateOrMutator(state);
          }
        }
      }))
      const store = pinia._s.get(id);
      return store;
    }
  }

  return useStore;
}