const cart_item = Vue.component('cart-item', {
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
export default {
    cart_item: cart_item
};