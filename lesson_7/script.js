const app = new Vue({
    el: '#app',
    data: {
        cartItems: [],
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,

    },
    methods: {
        makeGETRequest(url, callback) {
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
        makePOSTRequest(url, data, callback) {
            let xhr;

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

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.send(data);
        },
        FilterGoods() {
            console.log(`Search ${this.searchLine} ...`)
        },
        cartClickHandler() {
            if (this.isVisibleCart) {
                this.isVisibleCart = false
            } else {
                this.showCart()
                this.isVisibleCart = true
            }

        },
        addCart(item) {
            this.makePOSTRequest('/addToCart', JSON.stringify(item), function () {
            })
        },
        showCart() {
            this.makeGETRequest('/showItemsInCart', function (items) {
                console.log('после нажатия')
                this.cartItems = JSON.parse(items)
                console.log(this.cartItems)
            })
        },
        removeItem() {

        }
    },
    computed: {
        totalValue() {
            return ``
        }

    },
    mounted() {
        this.makeGETRequest('/showItemsInCart', function (items) {
            console.log('Сразу')
            this.cartItems = JSON.parse(items)
            console.log(this.cartItems)
        })
        this.makeGETRequest('/catalog', (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        })
    }
})



