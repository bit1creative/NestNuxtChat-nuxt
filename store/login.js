export const state = () => ({
  currentUser: null,
  loggedUsers: [],
})

export const actions = {
  setCurrentUser({ commit }, user) {
    commit('SET_CURRENT_USER', user)
  },
  SOCKET_generatedNewUser({ commit, dispatch }, user) {
    commit('ADD_NEW_LOGGED_USER', user)
    dispatch('setCurrentUser', user)
  },
}

export const mutations = {
  GET_LOGGED_USERS_FROM_LOCALE_STORAGE(state) {
    if (process.browser) {
      if (localStorage.loggedUsers) {
        state.loggedUsers = JSON.parse(localStorage.getItem('loggedUsers'))
      }
    }
  },
  ADD_NEW_LOGGED_USER(state, user) {
    if (
      state.loggedUsers.filter((existingUser) => existingUser._id === user._id)
        .length !== 0
    )
      return
    state.loggedUsers = state.loggedUsers
      ? [...state.loggedUsers, user]
      : [user]
    if (process.browser) {
      if (localStorage.loggedUsers)
        localStorage.setItem('loggedUsers', JSON.stringify(state.loggedUsers))
      else localStorage.setItem('loggedUsers', JSON.stringify([user]))
    }
    state.currentUser = user
  },

  SET_CURRENT_USER(state, user) {
    state.currentUser = state.loggedUsers.filter(
      (existingUser) => existingUser._id === user._id
    )[0]
  },
}
