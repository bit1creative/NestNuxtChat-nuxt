export const state = () => ({
  users: [],
  activeChat: null,
  messages: {},
})

export const actions = {
  SOCKET_getUsers({ commit }, users) {
    commit('SET_USERS', users)
    commit('SET_ACTIVE_CHAT', users[0])
  },
  SOCKET_newMessage({ commit }, { msg, interlocutor, date }) {
    commit('NEW_MESSAGE', { msg, interlocutor, date, fromMe: false })
  },
  SOCKET_loadMessageHistory({ commit }, messages) {
    if (messages && Object.keys(messages).length !== 0)
      commit('LOAD_CHAT_HISTORY', messages)
  },
  setActiveChat({ state, commit }, _id) {
    const newChat = state.users.find((user) => user._id === _id)
    if (state.activeChat._id !== newChat._id) commit('SET_ACTIVE_CHAT', newChat)
  },
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_ACTIVE_CHAT(state, chat) {
    state.activeChat = chat
  },
  NEW_MESSAGE(state, { msg, interlocutor, date, fromMe }) {
    if (Object.keys(state.messages).includes(interlocutor)) {
      state.messages = {
        ...state.messages,
        [interlocutor]: [
          ...state.messages[interlocutor],
          { msg, date, fromMe },
        ],
      }
      return
    }
    state.messages = {
      ...state.messages,
      [interlocutor]: [{ msg, date, fromMe }],
    }
  },
  LOAD_CHAT_HISTORY(state, messages) {
    state.messages = { ...state.messages, ...messages }
  },
}
