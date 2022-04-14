export const state = () => ({
  facs: null,
})

export const mutations = {
  setFacs(state, data) {
    state.facs = data
  }
}

export const getters = {
  getFacs(state) {
    return state.facs
  }
}
