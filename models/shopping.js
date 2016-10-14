let mongoose = require('mongoose')
mongoose.connect('localhost:27017/shopping-cart')

let Schema = mongoose.Schema

let itemsSchema = new Schema({
  item_code: String,
  name: String,
  description: String,
  price: Number,
  stock: Number
})

let cartsSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "customers"
  },
  transaction_date: Date,
  itemList: [{
    item_detail: {
      type: Schema.Types.ObjectId,
      ref: 'items'
    },
    qty: Number}]
})

let customersSchema = new Schema({
  member_id: String,
  name: String,
  address: String,
  zipcode: String,
  phone: String
})

let Items = mongoose.model('items', itemsSchema)
let Carts = mongoose.model('carts', cartsSchema)
let Customers = mongoose.model('customers', customersSchema)

module.exports = {Items, Carts, Customers}
