import cartStore from "../store/cartStore.js";
const { mapState } = Pinia;
export default {
  template: ` <div class="bg-light p-4 my-4">
<div v-if="!cartList.carts.length">購物車沒有任何品項</div>
<table v-else class="table align-middle">
  <tbody>
    <tr v-for="item in cartList.carts" :key="item.id">
      <td width="100">
        <a href="#" class="text-dark" @click.prevent="removeCartItem(item.id)"><i class="fas fa-times"></i></a>
      </td>
      <td width="100">
        <img
          :src="item.product.imageUrl"
          class="table-image" alt="" />
      </td>
      <td>{{item.product.title}}</td>
      <td width="200">
        <select name="" id="" class="form-select" :value="item.qty" @change="(e) => setCartQty(item.id, e.target.value)">
          <option :value="1" v-for="i in 20" :key="i">{{ i }}</option>
        </select>
      </td>
      <td width="200" class="text-end">
      $ {{item.subtotal}}
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="5" class="text-end">總金額 NT$ {{cartList.total}}</td>
    </tr>
  </tfoot>
</table>
</div>`,
  computed: {
    cartList()
    {
      return cartStore().cartList;
    }
  },
  methods: {
    removeCartItem(id)
    {
      cartStore().removeCartItem(id);
    },
    setCartQty(id, qty)
    {
      cartStore().setCartQty(id, qty);
    }

  }
  // computed: mapState(cartStore, ['cartList'])
};