import { login, logout, clear } from '@/api/user'

const getDefaultState = () => {
  console.log('getDefaultState')

  return {
    token: '',
    name: '',
    avatar: '',
    displayName: '',
    username: '',
    ticket: '',
    refresh_token: '',
    authorities: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
  },
  SET_TICKET: (state, ticket) => {
    state.ticket = ticket
  },
  SET_AUTHORITIES: (state, authorities) => {
    state.authorities = authorities
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DISPLAYNAME: (state, displayName) => {
    state.displayName = displayName
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }

}

const actions = {
  // user login
  login({ commit }, form) {
    return new Promise((resolve, reject) => {
      login(form)
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.name)
          commit('SET_DISPLAYNAME', data.displayName)
          commit('SET_AUTHORITIES', data.authorities)
          commit('SET_USERNAME', data.username)
          commit('SET_TICKET', data.ticket)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {},

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          clear()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
