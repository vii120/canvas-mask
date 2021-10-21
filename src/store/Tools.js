const state = {
  switchBtns: ['pen', 'eraser'],
  penType: 'pen',
  penSize: 20,
};

const CHANGE_PEN_TYPE = 'CHANGE_PEN_TYPE';
const UPDATE_PEN_SIZE = 'UPDATE_PEN_SIZE';

const actions = {
  changePenType({ commit }, type) {
    commit(CHANGE_PEN_TYPE, type);
  },
  updatePenSize({ commit }, size) {
    commit(UPDATE_PEN_SIZE, size);
  },
};

/* eslint-disable no-unused-vars */
const mutations = {
  [CHANGE_PEN_TYPE](state, type) {
    state.penType = type;
  },
  [UPDATE_PEN_SIZE](state, size) {
    state.penSize = size;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
