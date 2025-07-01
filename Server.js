
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
        firstname:ouruser.firstname ,
        lastname: ouruser.lastname,
        email: ouruser.email,
        password: ouruser.password
    })

    let result=await a.save()

    if(result){
        res.json({
            status:true
        })
    }
    else{
        res.json({
            status:false
        })
    }
})





// port -------------------
app.listen(8080, () => {
    console.log("node server start at 8080 ")
})