class Cart {
    constructor() {
        this.cart_items = {
            0: { id_product: 123, product_name: 'Ноутбук', price: 45600 },
            1: { id_product: 456, product_name: 'Мышка', price: 1000 }
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
        const item_id = event.target.dataset.id
        if (!(item_id in this.cart_items)) {
            this.cart_items[item_id] = new Cart_item(event.currentTarget.children[0].innerText, event.currentTarget.children[1].innerText, 1)
        } else {
            this.cart_items[item_id].increase_quantity()
        }
        console.log(this.cart_items)
        this.totalValue()
    }
    /**
    * Функция овтечает за уменьшение кол-ва товара/его удаление
    */
    removeItem(event) {
        const item_id = event.target.dataset.id
        if (item_id in this.cart_items && this.cart_items[item_id].quantity > 1) {
            this.cart_items[item_id].decrease_quantity()
        } else {
            this.cart_items[item_id].delete_item(this.cart_items, item_id)
        }
        console.log(this.cart_items)
        this.totalValue()
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
        for (let id in this.cart_items) {
            console.log(`Name - ${this.cart_items[id].product_name}, price - ${this.cart_items[id].price}`)
        }
    }
    /**
    * Функция функция отвечает за подсчет полной стоимости всех товаров в корзине
    */
    totalValue() {
        let total_value = 0
        for (let id in this.cart_items) {
            total_value += this.cart_items[id].quantity * this.cart_items[id].price
        }
        console.log(`Сумма корзины = ${total_value}`)
    }
}
class Cart_item {
    constructor(name, price, quantity) {
        this.name = name
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
document.querySelectorAll('.goods-item').forEach(function (item) {
    item.addEventListener('click', new_cart.addItem)
})
new_cart.showItems()