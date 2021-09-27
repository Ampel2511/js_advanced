class Cart {
    constructor() {
        this.cart_items = {}
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
    * Функция функция отвечает за подсчет полной стоимости всех товаров в корзине
    */
    total_value() {
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
    increase_quantity() {
        this.quantity++
    }
    /**
    * Функция отвечает за уменьшение кол-ва товара при нажатии на кнопку "-" радом с товаром в окне корзины
    */
    decrease_quantity() {
        pass
    }
    /**
    * Функция отвечает за удаление конкретного товара из корзины при нажатии на крестик рядом с товаром в окне корзины
    */
    delete_item() {
        pass
    }
    /**
    * Функция показывает краткуию информацию о товаре в окне корзины: название, краткое описание и тд.
    */
    show_info() {
        pass
    }
    /**
    * Функция отвечает за подсчет суммы по конкретному товару
    */
    total_value() {
        pass
    }
}
let cart = new Cart()
document.querySelectorAll('.goods-item').forEach(function (item) {
    item.addEventListener('click', function (event) {
        if (!(event.target.dataset.id in cart.cart_items)) {
            cart.cart_items[event.target.dataset.id] = new Cart_item(event.currentTarget.children[0].innerText, event.currentTarget.children[1].innerText, 1)
        } else {
            cart.cart_items[event.target.dataset.id].increase_quantity()
        }
        console.log(cart)
        cart.total_value()
    })
})
