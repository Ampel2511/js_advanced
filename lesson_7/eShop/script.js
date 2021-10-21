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
Vue.component('goods-list', {

    props: ['data'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in data[0]" :data="[good, data[1]]"></goods-item>
    </div>
    `

});

Vue.component('goods-item', {
    props: ['data'],
    template: `
    <div class="goods-item">
        <h3>{{ data[0].product_name }}</h3>
        <p>{{ data[0].price }}</p>
        <button class="add-button" type="button"  @click="addToCart(data)">В корзину</button>
        </div>
        `,
    methods: {
        addToCart(data) {
            this.data[1].push(data[0]);
            postResponse('/addToCart', data[0]).then();
            console.log(data)
        },
    }
});

Vue.component('search', {
    props: ['data'],
    template: `
    <div class="search">
        Search <input type="text" v-model="data[0]" />
        <button class="search-button" type="button" @click="FilterGoods(data)">Искать</button>
        <br>
    </div>
    `,
    methods: {
        FilterGoods(data) {
            this.data[2] = data[0] ?
                this.data[1].filter(product => product.product_name.toLowerCase().includes(data[0].toLowerCase())) :
                this.data[1];
            console.log(data)
        }
    }
})

Vue.component('cart', {
    props: ['data'],
    template: `
    <div class="cartComponent">
        <button class="cart-button" type="button" @click="visiblecart(data)">Корзина</button>
        <span class="cartIconWrap" @click="data[0] = !data[0]">
            <img class="cartIcon" src="images/cart.png" alt="">
            <span>0</span>
        </span>
            <div class="cart" v-show="data">
                <div class="cart_row cart_head">
                    <div>Название товара</div>
                    <div>Цена за шт.</div>
                    <div>Итого</div>
                </div>
                <div class="cart_total">
                    Товаров в корзине на сумму:
                    $<span class="cart_total_value">0</span>
                </div>
                <div class="cart_row" v-if="data[1].length">
                    <cart-item v-for="(prod, index) in data[1]" :data="[[prod, index], data[1]]"></cart-item>
                </div>
            </div>
    </div>
    `,
    methods: {
        visiblecart(data) {
            data[0] = !data[0]
            console.log(data)
        }
    }
})
Vue.component('cart-item', {
    props: ['data'],
    template: `
    <div class="cart_row">
        <div>{{data[0][0].product_name}}</div>
        <div>{{data[0][0].price}}</div>
        <button class="buy-btn" :data-id=data[0][0].id_product
            @click="removeFromCart(data)">Удалить</button>
    </div>
        `,
    methods: {
        removeFromCart(data) {
            this.data[1] = [...this.data[1].slice(0, data[0][1]), ...this.data[1].slice(data[0][1] + 1)];
            console.log(data[1])
        }
    }
});
