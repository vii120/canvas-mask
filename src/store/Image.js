const state = {
  // upload
  uploadImg: null,
  isUploading: false,
  imgWidth: null,
  imgHeight: null,
  // canvas
  canvasEl: null,
  canvasOutput: null,
  displayOutput: false,
};

const UPDATE_USER_IMAGE = 'UPDATE_USER_IMAGE';
const UPDATE_LOADING = 'UPDATE_LOADING';
const SET_IMAGE_SIZE = 'SET_IMAGE_SIZE';
const RESET_CANVAS_ELEMENT = 'RESET_CANVAS_ELEMENT';
const UPDATE_CANVAS_ELEMENT = 'UPDATE_CANVAS_ELEMENT';
const GENERATE_OUTPUT = 'GENERATE_OUTPUT';
const TOGGLE_OUTPUT_DISPLAY = 'TOGGLE_OUTPUT_DISPLAY';

const actions = {
  async onUpload({ commit, dispatch }, e) {
    const [file] = e.target.files;
    const uploadImg = URL.createObjectURL(file);
    // set image size & canvas
    const image = new Image();
    image.src = uploadImg;
    commit(UPDATE_LOADING, true);
    await image.decode(); // wait for image ready
    dispatch('getUploadSize', image);
    commit(UPDATE_USER_IMAGE, uploadImg); // after set image size
    commit(UPDATE_LOADING, false);
  },
  resetUploadImg({ commit }) {
    commit(UPDATE_USER_IMAGE, null);
  },
  getUploadSize({ commit }, { width, height }) {
    const limitHeight = window.innerHeight * 0.9;
    const limitWidth = window.innerWidth * 0.9;
    let adjustWidth = width;
    let adjustHeight = height;
    // exceed size if image is too large
    if (adjustWidth > limitWidth) {
      adjustWidth = limitWidth;
      adjustHeight = (limitWidth * height) / width;
    }
    if (adjustHeight > limitHeight) {
      adjustHeight = limitHeight;
      adjustWidth = (limitHeight * width) / height;
    }
    commit(SET_IMAGE_SIZE, { width: adjustWidth, height: adjustHeight });
  },
  updateCanvasEl({ commit }, canvas) {
    commit(UPDATE_CANVAS_ELEMENT, canvas);
  },
  resetCanvasEl({ commit }) {
    commit(RESET_CANVAS_ELEMENT);
  },
  // convert canvas to image
  onGenerate({ commit }) {
    commit(GENERATE_OUTPUT, state.canvasEl.toDataURL('image/png'));
  },
  toggleDisplay({ commit, dispatch }) {
    if (!state.displayOutput) dispatch('onGenerate');
    commit(TOGGLE_OUTPUT_DISPLAY);
  },
};

/* eslint-disable no-unused-vars */
const mutations = {
  [UPDATE_USER_IMAGE](state, image) {
    state.uploadImg = image;
  },
  [UPDATE_LOADING](state, status) {
    state.isUploading = status;
  },
  [SET_IMAGE_SIZE](state, size) {
    state.imgWidth = Math.floor(size.width);
    state.imgHeight = Math.floor(size.height);
  },
  [UPDATE_CANVAS_ELEMENT](state, el) {
    state.canvasEl = el;
  },
  [RESET_CANVAS_ELEMENT](state) {
    state.canvasEl
      .getContext('2d')
      .clearRect(0, 0, state.imgWidth, state.imgHeight);
  },
  [GENERATE_OUTPUT](state, result) {
    state.canvasOutput = result;
  },
  [TOGGLE_OUTPUT_DISPLAY](state) {
    state.displayOutput = !state.displayOutput;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
