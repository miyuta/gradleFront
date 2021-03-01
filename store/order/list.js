import axios from 'axios'
import auth from '@/middleware/auth'

export const state = () => ({
  headers: [
    {
      align: 'start',
      value: 'image',
      groupable: false,
      sortable: false,
    },
    {
      text: 'Goods Name',
      align: 'center',
      value: 'goods_api_response.gds_name',
      groupable: false,
    },
    {
      text: 'Goods Price',
      align: 'center',
      value: 'gds_price',
      groupable: false,
    },
    {
      text: 'Goods Quantity',
      align: 'center',
      value: 'cart_quantity',
    },
    {
      text: 'Total Price',
      align: 'center',
      value: 'cart_price',
      groupable: false,
    },
    {
      text: 'Delete',
      align: 'center',
      value: 'delGoods',
      sortable: false,
      groupable: false,
    },
  ],
  footerProps: {
    itemsPerPageOptions: [5, 10, 15],
  },
})

export const actions = {
  async delCartGoods({ dispatch }, cartId) {
    const accessToken = auth.getAccessToken()
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios
        .delete(
          `http://localhost:8080/api/cart/${cartId}?userId=${auth.getUserId()}`,
          config
        )
        .then(() => {
          dispatch('order/cart_list/getCartList', null, { root: true })
        })
        .catch(() => {
          this.$router.push('error')
        })
    }
  },
  moveToOrderInfo(context, cartInfoList) {
    this.$router.push({ name: 'order-info', params: { cartInfoList } })
  },
  back() {
    this.$router.push({ name: 'goods-list' })
  },
}
