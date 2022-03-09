import {
    def
} from '@vue/shared'
import {
    createStore
} from 'vuex'

const store = createStore({
    state() {
        return {
            isFullscreen: false,
            buycarts: []
        }
    },
    getters: {
        totalPrice(state) {
            let total = state.buycarts.reduce((pre, cur) => {
                return pre + cur.num * cur.price
            })
            return total
        }
    },
    actions: {

    },
    mutations: {
        setFullscreen(state, payload) {
            state.isFullscreen = payload
        },
        addBuycarts(state, payload) {
            state.buycarts.push(payload)
            console.log(state.buycarts);
        },
        addBuycartsNum(state, payload) {
            state.buycarts[payload].num++
        },
        minusBuycartsNum(state, payload) {
            state.buycarts[payload].num--
            state.buycarts = state.buycarts.filter(item => item.num !== 0)
        }
    },
    modules: {

    }

})

export default store