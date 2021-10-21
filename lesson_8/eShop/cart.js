const cart = Vue.component('cart', {
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
export default {
    cart: cart
};