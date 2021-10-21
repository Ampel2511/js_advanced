import { module_cart } from './cart'
import { module_cart_item } from './cart_item'
import { module_search } from './search'
import { module_goods_item } from './good_item'
import { module_goods_list } from './good_list'

const cart = module_cart.cart;
const cart_item = module_cart_item.cart_item;
const search = module_search.search;
const good_item = module_goods_item.good_item;
const good_list = module_goods_list.good_list;

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const postResponse = async (url, data) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

const app = new Vue({
    el: '#app',
    data: {
        allGoods: [],
        filteredGoods: [],
        searchLine: '',
        cartGoods: [],
        isVisibleCart: false

    },
    mounted: async function fetchGoods() {
        return await fetch(`/catalog`)
            .then(resp => resp.json())
            .then(data => {
                this.allGoods = data;
                this.filteredGoods = data;
            });
    },
});