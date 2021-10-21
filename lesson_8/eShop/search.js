const search = Vue.component('search', {
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
export default {
    search: search
};