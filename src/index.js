const express= require("express");
const app=express();
const morgan= require("morgan");
const path= require("path");

const products= [
    {id:1,
    name:"Laptop"},
    {id:2,
    name:"microphone"}
];

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Setting
app.set("port", 3000 || process.env.PORT);

//routes
app.get("/products", (req,res)=>{
    res.json(products)
})

app.post("/products", (req, res)=>{
    const {name}= req.body;
    products.push({
        id: products.length + 1,
        name
    })
    res.json({succesfullycreated:"true"})
})

app.put("/products/:id", (req,res)=>{
    const {id} = req.params;
    const {name}= req.body;

    products.forEach((product,i)=>{
        if (product.id==id){
            product.name= name;
        }
    })
    res.json({success:true});
})

app.delete("/products/:id", (req, res)=>{
    const {id}= req.params;
    products.forEach((product,i)=>{
        console.log(`${product.id} es igual a ${id}`);
        if(product.id ==id){
            products.splice(i,1);
        }
    })
    res.send("success")
})

//staticfiles
const thePath= path.join(__dirname, "public")
app.use(express.static(thePath));

app.listen(app.get("port"), ()=>{
    console.log("server listenin on port", app.get("port"));
})