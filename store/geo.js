export const state = () => ({position: {
  city:''
}})

export const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

