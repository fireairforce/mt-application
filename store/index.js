import axios from '../server/interface/utils/axios'

export const actions = {
    async nuxtServerInit({commit },{req}) {
      const {status, data:{ city,province } } = await axios.get('/geo/getPosition');
      commit('geo/setPosition', status === 200 ? { city,province} :{city:'',province:''})
    }
}