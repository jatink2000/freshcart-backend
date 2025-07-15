
express = require("express")

app = express()


// bodyParser------------
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))


// cors ----------------
cors = require("cors")
app.use(cors())


// model schema ------------------
const Users = require("./model/Users")
const Products = require("./model/Addproduct")
const wishlists = require("./model/wishlist")
const Reviews = require("./model/Review")






// mongodb --------------------
const { mongoose } = require("mongoose")
mongoose.connect("mongodb://localhost:27017/freshcart").then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err)
})


// signup -------------------
app.post("/signup", async (req, res) => {
    let ouruser = req.body.signupdata
    let a = await Users.insertOne({
        firstname: ouruser.firstname,
        lastname: ouruser.lastname,
        email: ouruser.email,
        password: ouruser.password
    })

    let result = await a.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})




// login ----------------------
app.post("/login", async (req, res) => {
    let ouruser = req.body.logindata
    let a = await Users.findOne({
        email: ouruser.email,
        password: ouruser.password
    })

    if (a) {
        res.json({
            status: true,
            logedin: a
        })
    }
    else {
        res.json({
            status: false
        })
    }

})


// reset password ------------
app.post("/resetpassword", async (req, res) => {
    let ouruser = req.body.resetpassword
    let a = await Users.findOneAndUpdate({ "email": ouruser.email }, { $set: { "password": ouruser.password } })

    if (a) {
        res.json({
            status: true,
        })
    }
    else {
        res.json({
            status: false
        })
    }

})







// addproduct -------------------
app.post("/addproduct", async (req, res) => {


    let ourproduct = req.body.addproduct

    let a = await Products.insertOne({
        producttitle: ourproduct.producttitle,
        productcategory: ourproduct.productcategory,
        productweight: ourproduct.productweight,
        productquantity: ourproduct.productquantity,
        productimage: ourproduct.productimage,
        productdescriptions: ourproduct.productdescriptions,
        regularprice: ourproduct.regularprice,
        saleprice: ourproduct.saleprice
    })

    let result = await a.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})


// deleteproduct -------------
app.post("/deleteproduct", async (req, res) => {
    let deleteourproduct = await Products.findOneAndDelete({ "_id": req.body._id })

    if (deleteourproduct) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }

})



// editproduct-------------

app.post("/editproduct", async (req, res) => {
    let ourproduct = req.body.edititem
    let editourproduct = await Products.findOneAndUpdate({ "_id": ourproduct._id }, {
        $set: {
            producttitle: ourproduct.producttitle,
            productcategory: ourproduct.productcategory,
            productweight: ourproduct.productweight,
            productquantity: ourproduct.productquantity,
            productimage: ourproduct.productimage,
            productdescriptions: ourproduct.productdescriptions,
            regularprice: ourproduct.regularprice,
            saleprice: ourproduct.saleprice
        }
    })



    if (editourproduct) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})




// products ------------------
app.get("/products", async (req, res) => {
    let allproduct = await Products.find({})


    if (allproduct) {
        res.json({
            status: true,
            ourproducts: allproduct
        })
    }
    else {
        res.json({
            status: false
        })
    }
})







// wishlist ----------
app.post("/wishlist", async (req, res) => {
    let ourproduct = req.body.a

    let a = await wishlists.insertOne({
        producttitle: ourproduct.producttitle,
        productcategory: ourproduct.productcategory,
        productweight: ourproduct.productweight,
        productquantity: ourproduct.productquantity,
        productimage: ourproduct.productimage,
        productdescriptions: ourproduct.productdescriptions,
        regularprice: ourproduct.regularprice,
        saleprice: ourproduct.saleprice
    })

    let result = await a.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }
})



// wishlistsproduct-------------
app.get("/wishlistsproduct", async (req, res) => {
    let a = await wishlists.find({})

    if (a) {
        res.json({
            status: true,
            wishlistsproduct: a
        })
    }
    else {
        res.json({
            status: false
        })
    }
})



// productreview ----------------
app.post("/productreview", async (req, res) => {
    let a = await Reviews.insertOne({
        productid: req.body.id,
        name: req.body.review.fullname,
        review: req.body.review.review
    })

    let result = await a.save()

    if (result) {
        res.json({
            status: true
        })
    }
    else {
        res.json({
            status: false
        })
    }



})




// review Get ---------------------
app.get("/allreview", async (req, res) => {
    let allreviews = await Reviews.find({})


    if (allreviews) {
        res.json({
            status: true,
            ourreview: allreviews
        })
    }
    else {
        res.json({
            status: false
        })
    }
})



// port -------------------
app.listen(8080, () => {
    console.log("node server start at 8080 ")
})