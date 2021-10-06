const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise(function (resolve) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    })
}

class GoodsItem {
    constructor(id, title, price) {
        this.id = id
        this.product_name = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item" data-id="${this.id}"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`)

    }
    render(render_list) {
        let listHtml = '';
        render_list.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods().then(function (items) {
    let goods_list = list.goods
    goods_list = JSON.parse(items)
    console.log(goods_list)
    list.render(goods_list)
})

