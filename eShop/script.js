const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class Cart {
    constructor() {
        this.cart_items = {
        }
    }
    /**
    * Функция скрывает окно корзины или отображает его
    */
    hide() {
        pass
    }
    /**
    * Функция функция отвечает за отрисовку разметки корзины в окне
    */
    render() {
        pass
    }
    /**
    * Функция отвечает за добавление товара в корзину
    */
    addItem(event) {
        const name = event.target.parentNode.children[0].innerText
        if (!(name in this.cart_items)) {
            this.cart_items[name] = new Cart_item(event.target.parentNode.children[1].innerText, 1)
        } else {
            this.cart_items[name].increaseQuantity()
        }
    }
    /**
    * Функция овтечает за уменьшение кол-ва товара/его удаление
    */
    removeItem(event) {
        const name = event.target.parentNode.children[0].innerText
        if (name in this.cart_items && this.cart_items[name].quantity > 1) {
            this.cart_items[name].decreaseQuantity()
        } else {
            this.cart_items[name].deleteItem(this.cart_items, name)
        }
    }
    /**
    * Функция функция отвечает за очищение содержимого корзины при нажатии на кнопку
    */
    clear() {
        pass
    }
    /**
    * Функция функция отвечает за переход к оформлению заказа
    */
    confirm() {
        pass
    }
    /**
    * Функция функция отвечает за получение списка товаров корзины
    */
    showItems() {
        for (let name in this.cart_items) {
            console.log(`Name - ${name}, price - ${this.cart_items[name].price}, total - ${this.cart_items[name].quantity * this.cart_items[name].price}`)
        }
    }
    /**
    * Функция функция отвечает за подсчет полной стоимости всех товаров в корзине
    */
    totalValue() {
        let total_value = 0
        for (let name in this.cart_items) {
            total_value += this.cart_items[name].quantity * this.cart_items[name].price
        }
        console.log(`Сумма корзины = ${total_value}`)
    }
}
class Cart_item {
    constructor(price, quantity) {
        this.price = price
        this.quantity = quantity
    }

    /**
    * Функция отвечает за увеличение кол-ва товара при добавлении его в корзину или нажатии кнопки "+" рядом с товаром в окне корзины
    */
    increaseQuantity() {
        this.quantity++
    }
    /**
    * Функция отвечает за уменьшение кол-ва товара при нажатии на кнопку "-" радом с товаром в окне корзины
    */
    decreaseQuantity() {
        this.quantity--
    }
    /**
    * Функция удаляет товар из корзины и тд.
    */
    deleteItem(obj, key) {
        delete obj[`${key}`]
    }
    /**
    * Функция показывает краткуию информацию о товаре в окне корзины: название, краткое описание и тд.
    */
    showInfo() {
        pass
    }
    /**
    * Функция отвечает за подсчет суммы по конкретному товару
    */
    totalValue() {
        pass
    }
}
let new_cart = new Cart()
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
        },
        FilterGoods() {
            console.log(`Search ${this.searchLine} ...`)
        },
        cartClickHandler(event, cart = new_cart) {
            cart.showItems()
            cart.totalValue()
            if (this.isVisibleCart) {
                this.isVisibleCart = false
            } else {
                this.isVisibleCart = true
            }

        },
        addCart(event, cart = new_cart) {
            cart.addItem(event)
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    }
})



