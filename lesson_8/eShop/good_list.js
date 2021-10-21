const goods_list = Vue.component('goods-list', {

    props: ['data'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in data[0]" :data="[good, data[1]]"></goods-item>
    </div>
    `

});
export default {
    goods_list: goods_list
};