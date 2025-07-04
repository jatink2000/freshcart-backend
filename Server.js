
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







// signup -------------------
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

// port -------------------
app.listen(8080, () => {
    console.log("node server start at 8080 ")
})