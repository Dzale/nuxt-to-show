import  {get, toggle, set} from '~/utils/vuex-helper'
import  mutationFile from './mutations'
import  gettersFile from './getters'
import  actionsFile from './actions'
import  stateFile from './state'

export const state = () => ({ ...stateFile });

export const mutations = { ...mutationFile }

export const getters = { ...gettersFile }

export const actions = { ...actionsFile }
