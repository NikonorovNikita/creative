<template>
    <div id="app" class="section" :class="{ 'active' : loading}">
        <div class="container">
            <SVGSymbols/>
            <div class="section__title">
                <div class="section__title-text">
                    Популярные квартиры
                </div>
            </div>
            <div class="section__body">
                <Apartments :apartments="apartments" v-on:toggleFavourite="onToggleFavourite"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex'
    import SVGSymbols from './components/SVGSymbols.vue'
    import Apartments from './components/Apartments.vue'

    export default {
        name: 'App',
        components: {
            SVGSymbols,
            Apartments
        },

        computed: {
            ...mapState([
                'loading',
                'apartments',
            ]),
        },

        methods: {
            ...mapActions([
                'getApartments',
                'toggleFavourite'
            ]),
            onToggleFavourite: function (apartmentID) {
                this.toggleFavourite(apartmentID)
            }
        },

        created: function () {
            this.getApartments()
        },
    }
</script>

<style lang="scss">
    #app {
        transition: opacity ease-in-out 300ms;
    }

    #app.active{
        opacity: .6;
        pointer-events: none;
    }
</style>
