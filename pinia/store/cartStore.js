const { defineStore } = Pinia;
import productsStore from "./productsStore.js";
export default defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    //只能使用一般函示，不能使用箭頭函示
    addToCart(productId, qty = 1)
    {
      // 取得已加入購物車的相同商品
      //如果有相同商品，就數量加一
      //如果沒有相同商品，就新增一筆
      const currentCart = this.cart.find(item => item.productId === productId);
      if (currentCart)
      {
        currentCart.qty += qty;
        return;
      }
      else
      { //新增一筆
        this.cart.push({
          id: new Date().getTime(), // 這裡的 id 是為了讓每個商品都有一個獨特的 id, 這樣就算是相同的商品也可以加入購物車
          productId,
          qty
        });
      }
      // console.log(this.cart);
    },
    setCartQty(id, qty = 1)
    {
      const currentCart = this.cart.find((item) => item.id === id);
      currentCart.qty = qty * 1;
    },
    removeCartItem(id)
    {
      const index = this.cart.findIndex(item => item.id === id);
      this.cart.splice(index, 1);
    }
  },
  getters: {
    cartList: ({ cart }) =>
    {
      //1. 購物車品項資訊需要整合產品資訊
      //2. 購物車品項資訊需要計算小計
      //3. 購物車品項資訊需要計算總金額
      const products = productsStore().products;
      const carts = cart.map(item =>
      {
        //單一產品取出
        const product = products.find(product => product.id === item.productId);
        return {
          ...item,
          product,
          subtotal: item.qty * product.price
        };
      });
      const total = carts.reduce((acc, item) => acc + item.subtotal, 0);
      console.log(carts, total);
      return {
        carts,
        total
      };
    },
  }
});