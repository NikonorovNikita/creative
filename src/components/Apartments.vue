<template>
    <div class="apartments">
        <carousel class="apartments__slider" :perPageCustom="[[0, 1], [768, 2], [1280, 3]]"
                  paginationActiveColor="#FFDD66" :paginationPadding="5">
            <slide class="apartments__slider-item" v-for="item in carouselApartments" :key="item.id">
                <div class="apartment-card apartment-card--type-default">
                    <div class="apartment-card__inner" data-auto-height="true">
                        <div class="apartment-card__link-wrapper">
                            <a href="#" class="link link--wrapper">
                                <div class="apartment-card__name"><span class="apartment-card__name-text">{{item.attributes.title}}, {{item.attributes.area}} м<sup>2</sup> →</span>
                                </div>
                                <div class="apartment-card__subtitle">Секция-{{item.attributes.address.house}}, кв. №{{item.attributes.address.room}}</div>
                                <div class="apartment-card__wrapper-layout">
                                    <div class="apartment-card__layout" :style="{ backgroundImage: 'url(\'' + item.attributes.image + '\')' }">
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="apartment-card__price">
                            <div class="apartment-card__price-block">
                                <div class="apartment-card__price-current">{{formatPrice(item.attributes.price)}}</div>
                                <div class="apartment-card__price-action"><a class="tag tag--color-yellow">
                                    {{item.attributes.address.street}}
                                </a>
                                </div>
                            </div>
                        </div>
                        <div class="apartment-card__properties">
                            <div class="apartment-card__property">
                                <div class="favourite favourite--type-main" :class="{ 'active' : item.attributes.favourite }" v-on:click='toggleFavourite(item.id)'>
                                    <svg class="favourite__svg" width="24px" height="22px">
                                        <use xlink:href="#favourite"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="apartment-card__property">
                                <div class="apartment-card__property-name">Этаж</div>
                                <div class="apartment-card__property-value">{{item.attributes.floor}} из {{item.attributes.floorMax}}</div>
                            </div>
                            <div class="apartment-card__property">
                                <div class="apartment-card__property-name">Менеджер</div>
                                <div class="apartment-card__property-value">{{item.relationships.attributes.last_name}} {{item.relationships.attributes.first_name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';

    export default {
        name: "Apartments",
        components: {
            Carousel,
            Slide
        },
        props: {
            apartments: Array
        },
        computed: {
            carouselApartments: {
                get: function () {
                    return this.apartments
                },
                set: function () {

                }
            },
        },
        methods: {
            formatPrice(price) {
                return price.toLocaleString() + " ₽";
            },
            toggleFavourite(itemId) {
                this.$emit("toggleFavourite", itemId);
            }
        }
    }
</script>

<style scoped lang="scss">
    .apartments {
        &__slider {
            margin: 0 -10px;

            &-item {
                padding: 0 10px;
            }
        }
    }
</style>
