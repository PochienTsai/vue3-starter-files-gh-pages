import productsStore from "../store/productsStore.js";
import cartStore from "../store/cartStore.js";
//const { mapState, mapActions } = Pinia;// import mapState from 'pinia';
export default {
  template: `    <div class="row row-cols-3 my-3 g-4">
  <div class="col" v-for ="product in sortProducts"  :key="product.id">
    <div class="card">
      <img
        :src="product.imageUrl"
        class="card-img-top" alt="..." />
      <div class="card-body">
        <h6 class="card-title">
          {{ product.title }}
          <span class="float-end">$ {{ product.price }}</span>
        </h6>
        <a href="#" class="btn btn-outline-primary w-100" @click.prevent ="addToCart(product.id, 1)">加入購物車</a>
      </div>
    </div>
  </div>
</div>`,
  computed: {
    sortProducts()
    {
      return productsStore().sortProducts;
    }
  },
  methods: {
    addToCart(productId, quantity)
    {
      cartStore().addToCart(productId, quantity);
    }
  }
};