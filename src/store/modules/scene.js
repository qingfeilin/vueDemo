import Vue from 'vue'

const scene = {
  state: {
    onSelectContainer: null,
    addComponentType: null,
    isDesignerType: false,
    onDeleteContainerKey: '',
    componentEdit: {
      show: false,
      sceneConfig: null,
      saveComponent: null
    }
  },
  mutations: {
    // SET_SIDEBAR_TYPE: (state, type) => {
    //   state.sidebar = type
    //   // Vue.ls.set(SIDEBAR_TYPE, type)
    // },
    ADD_COMPONENT: (state, type) => {
      state.addComponentType = type
      // Vue.ls.set(SIDEBAR_TYPE, type)
    },
    ON_CONTAINER_SELECTED: (state, obj) => {
      if (state.isDesignerType) {
        state.onSelectContainer = obj
      }
      // Vue.ls.set(SIDEBAR_TYPE, type)
    },
    ON_CANCLE_CONTAINER_SELECT: (state) => {
      if (state.isDesignerType) {
        state.onSelectContainer = null
      }
      // Vue.ls.set(SIDEBAR_TYPE, type)
    },
    SET_DESIGNER_TYPE: (state, type) => {
      state.isDesignerType = type
    },
    ON_CONTAINER_DELETE: (state, key) => {
      state.onDeleteContainerKey = key
    },
    ON_COMPONENT_CONFIG: (state, sceneConfig) => {
      state.componentEdit.sceneConfig = sceneConfig
      state.componentEdit.saveComponent = null
      state.componentEdit.show = true
    },
    ON_COMPONENT_CONFIG_SAVE: (state, componentConfig) => {
      state.componentEdit.sceneConfig = null
      state.componentEdit.saveComponent = componentConfig
      state.componentEdit.show = false
    }
  },
  actions: {
    // componentConfig ({ commit }, type) {
    //   commit('SET_SIDEBAR_TYPE', type)
    // },
    addComponent ({ commit }, type) {
      commit('ADD_COMPONENT', type)
    },
    onContainerSelected ({ commit }, obj) {
      commit('ON_CONTAINER_SELECTED', obj)
    },
    onPageSelected ({ commit }) {
      commit('ON_CANCLE_CONTAINER_SELECT')// 取消容器选择
    },
    setDesignerType ({ commit }, type) {
      commit('SET_DESIGNER_TYPE', type)
    },
    onContainerDelete ({ commit }, key) {
      commit('ON_CONTAINER_DELETE', key)
    },
    onComponentConfig ({ commit }, sceneConfig) {
      commit('ON_COMPONENT_CONFIG', sceneConfig)
    },
    onComponentConfigSave ({ commit }, ComponentConfig) {
      commit('ON_COMPONENT_CONFIG_SAVE', ComponentConfig)
    }
  }
}

export default scene
