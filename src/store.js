import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /* ======================================= */
        apiBaseUrl: process.env.API_URL ? process.env.API_URL : 'https://creative.n-nikonorov.ru',
        axiosConfig: {crossDomain: true},
        /* ======================================= */
        loading: false,
        error: false,
        apartments: []
    },
    mutations: {
        set(state, {type, items}) {
            state[type] = items
        }
    },
    actions: {
        async getApartments({commit, state}) {
            commit('set', {type: 'loading', items: true})
            const url = state.apiBaseUrl + '/api/apartments.php'
            axios.post(url, {}, state.axiosConfig).then((response) => {
                if (response.data.result == 'ok') {
                    let apartments = response.data.apartments
                    commit('set', {type: 'apartments', items: apartments})
                } else {
                    commit('set', {type: 'error', items: true})
                }
            }).catch(function (error) {
                alert(error)
            })
            commit('set', {type: 'loading', items: false})
        },
        async toggleFavourite({commit, state}, apartmentID) {
            commit('set', {type: 'loading', items: true})
            //TODO при реализованном изменении поля "избранное" средстами api - отправлять изменения на сервер,
            // после чего получать обновленный массив квартир, либо успешный статус изменения, и после этого менять свойство квартиры в состоянии
            let apartments = state.apartments
            for (let item of apartments) {
                if (item.id === apartmentID) {
                    switch (item.attributes.favourite) {
                        case true:
                            item.attributes.favourite = false;
                            break;
                        case false:
                            item.attributes.favourite = true;
                            break;
                    }
                    break;
                }
            }
            commit('set', {type: 'apartments', items: apartments})
            commit('set', {type: 'loading', items: false})
        }
    }
})
