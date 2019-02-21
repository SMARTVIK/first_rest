const express = require('express')
const http = require('http');
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')
app.use(morgan('short'))

const bodyParser = require('body-parser')

app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/user_create',(req,res)=>{


    const firstName = req.body.first_name
    const lastName = req.body.last_name

    const query = "INSERT INTO users (first_name,last_name) VALUES(?,?)"

    getConnection().query(query,[firstName,lastName],(err,results,fields) =>{

        if(err){
            console.log("Failed to insert new user: "+err)
            res.sendStatus(500)
            return 
        }

     console.log("Inserted new user "+results.insertId)
     res.end()


    })

    res.end()

})

app.get("/",(req,res)=>{

    var user1 = {firstName : "Vivek",lastName : "Singh"}
    var user2 = {firstName : "Rajan",lastName : "Singh"}
    res.json([user1,user2])

})


app.get("/users",(req,res)=>{

     const connection = getConnection()
     const query = "SELECT * FROM users"

     connection.query(query,(err,rows)=>{

        if(err){
            console.log(err)
             res.sendStatus(500)
            return 
        } 

       res.json(rows)

     })

})

function getConnection(){
    return mysql.createConnection({
        host:'localhost',
        user: "root",
        password:"PASSWORD",
        database:'vik_rest_ful'
     })
}

app.get("/users/:id",(req,res,fields)=>{

   
    const connection = mysql.createConnection({
       host:'localhost',
       user: "root",
       password:"PASSWORD",
       database:'vik_rest_ful'
    })

    const query = "SELECT * FROM users WHERE id = ?"

    console.log(query)

    const userId = req.params.id

    console.log(userId)

    connection.query(query,[userId],(err,rows,fields)=>{

      if(err){
          console.log(err)
           res.sendStatus(500)
          return 
      } 

      console.log(rows)

      res.json(rows)

    })

})


app.listen(8080,()=>{

console.log("server is up and running at port 8080")

})