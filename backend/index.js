const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const {conection} = require('./Config/database')
const productosRoute = require('./Routes/productosRoute')
const carritoRoute = require('./Routes/carritoRoute')
const categoriasRoute = require('./Routes/categoriasRoute')
const favoritosRoute = require('./Routes/favoritosRoute')
const imagenesRoute = require('./Routes/imagenesRoute')
const movimientosFinancierosRoute = require('./Routes/movimientosFinancierosRoute')
const movimientosStockRoute = require('./Routes/movimientosStockRoute')
const pedidosRoute = require('./Routes/pedidosRoute')
const usuariosRoute = require('./Routes/usuariosRoute')
const authRoute = require('./Routes/authRoute')
const paymentsRoute = require('./Routes/paymentRoute')
app.use(cors())
app.use(express.json())
app.use('/', productosRoute)
app.use('/', carritoRoute)
app.use('/', categoriasRoute)
app.use('/', favoritosRoute)
app.use('/', imagenesRoute)
app.use('/', movimientosFinancierosRoute)
app.use('/', movimientosStockRoute)
app.use('/', pedidosRoute)
app.use('/', usuariosRoute)
app.use('/', authRoute)
app.use('/', paymentsRoute)

app.get('/', (req, res)  => {
    res.send('Hello World')
})  


conection.connect((err) =>{
    if(err) throw err
    console.log('Conectado a la base de datos')
})



app.listen(process.env.PORT, (err) => {
    if(err) throw err
         console.log('El server esta corriendo en el puerto ' + process.env.PORT)
    

   
})