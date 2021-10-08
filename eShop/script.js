const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url, callback) {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }
})
Vue.component('goods-list', {

    props: ['goods'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
    `

});

Vue.component('goods-item', {
    props: ['good'],
    template: `
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class="add-button" type="button">В корзину</button>
        </div>
        `
});

Vue.component('search', {
    props: ['searchArea'],
    template: `
    <div class="search">
        Search <input type="text" v-model="searchArea" />
        <button class="search-button" type="button" @click="FilterGoods">Искать</button>
        <br>
    </div>
    `,
    methods: {
        FilterGoods() {
            console.log(`Search ${this.searchArea} ...`)
        }
    }
})

Vue.component('cart', {
    props: ['visible_cart'],
    template: `
    <div class="cartComponent">
        <button class="cart-button" type="button" @click="cartClickHandler">Корзина</button>
        <span class="cartIconWrap" @click="cartClickHandler">
            <img class="cartIcon" src="images/cart.png" alt="">
            <span>0</span>
        </span>
        <div class="cart" v-show="visible_cart">
                <div class="cart_row cart_head">
                    <div>Название товара</div>
                    <div>Количество</div>
                    <div>Цена за шт.</div>
                    <div>Итого</div>
                </div>
                <div class="cart_total">
                    Товаров в корзине на сумму:
                    $<span class="cart_total_value">0</span>
                </div>
            </div>
    </div>
    `,
    methods: {
        cartClickHandler(event) {
            if (this.visible_cart) {
                this.visible_cart = false
            } else {
                this.visible_cart = true
            }

        },
    }
})

