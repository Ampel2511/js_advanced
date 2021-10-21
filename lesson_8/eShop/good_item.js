const goods_item = Vue.component('goods-item', {
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
export default {
    goods_item: goods_item
};