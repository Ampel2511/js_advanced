class GoodsItem {
    constructor(title, price, id) {
        this.id = id
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item" data-id="${this.id}">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
        </div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, id: 1 },
            { title: 'Socks', price: 50, id: 2 },
            { title: 'Jacket', price: 350, id: 3 },
            { title: 'Shoes', price: 250, id: 4 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}
const list = new GoodsList();
list.fetchGoods();
list.render();