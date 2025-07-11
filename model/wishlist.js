
const { default: mongoose } = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  producttitle: String,
  productcategory: String,
  productweight: String,
  productquantity: String,
  productimage:String,
  productdescriptions: String,
  regularprice: String,
  saleprice:String
});


module.exports = mongoose.model('wishlists', wishlistSchema);