const {conection} = require('../Config/database')


const getAllProductsActives = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const consultaProductos = `
        SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.activo = 1
LIMIT ? OFFSET ?
    `;

    const consultaTotal = `
        SELECT COUNT(*) AS total
        FROM productos
        WHERE activo = 1
    `;

    conection.query(consultaProductos, [limit, offset], (err, productos) => {
        if (err) throw err;

        conection.query(consultaTotal, (err, totalResult) => {
            if (err) throw err;

            const total = totalResult[0].total;

            res.json({
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                productos
            });
        });
    });
};


const getAllProductsInactives = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const consultaProductos = `
        SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.activo = 0
LIMIT ? OFFSET ?
    `;

    const consultaTotal = `
        SELECT COUNT(*) AS total
        FROM productos
        WHERE activo = 0
    `;

    conection.query(consultaProductos, [limit, offset], (err, productos) => {
        if (err) throw err;

        conection.query(consultaTotal, (err, totalResult) => {
            if (err) throw err;

            const total = totalResult[0].total;

            res.json({
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                productos
            });
        });
    });
};




const getOneProductActive = (req, res) => {
const id = req.params.id
const consulta = `SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.id = ?
AND p.activo = 1`

conection.query(consulta, [id],(err, results) =>{
    if (err) throw err
    if (results.length === 0) {
        res.status(404).json({message:'Producto no encontrado'})
    } else {
        res.json(results)
    }
})
}


const getOneProductInactive = (req, res) => {
const id = req.params.id
const consulta = `SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.id = ?
AND p.activo = 0`

conection.query(consulta, [id],(err, results) =>{
    if (err) throw err
    if (results.length === 0) {
        res.status(404).json({message:'Producto no encontrado'})
    } else {
        res.json(results)
    }
})
}

const updateProducts = (req, res) => {
const id = req.params.id 
const nombre = req.body.nombre
const descripcion = req.body.descripcion
const precio = req.body.precio
const stock = req.body.stock
const stock_minimo = req.body.stock_minimo
const categoria_id = req.body.categoria_id

const consulta = 'update productos set nombre = ?, descripcion = ?, precio = ?, stock = ?, stock_minimo = ?, categoria_id = ? where id = ? and activo = 1'

conection.query(consulta, [nombre, descripcion, precio, stock, stock_minimo, categoria_id, id], (err, results) => {
    if (err) throw err
    res.json(results)
})
}

const createProducts = (req, res) => {
 const {nombre, descripcion, precio, stock, stock_minimo, categoria_id} = req.body

const consulta = 'insert into productos (nombre, descripcion, precio, stock, stock_minimo, categoria_id) values(?,?,?,?,?,?)'

conection.query(consulta, [nombre, descripcion, precio, stock, stock_minimo, categoria_id], (err, results) => {
    if (err) throw err
    res.json({message:'Producto creado'})
})
}

const deleteProducts = (req, res) => {

const id = req.params.id 

const consulta = 'update productos set activo = 0 where id = ? and activo = 1'

conection.query(consulta, [id], (err, results) => {
    if (err) throw err
    if (results.affectedRows === 0) {
        res.status(404).json({message:'Producto no encontrado'})
    } else {
        res.json({message:'Producto eliminado'})
    }
   
})
}


const restoreProducts = (req, res) => {

const id = req.params.id 

const consulta = 'update productos set activo = 1 where id = ? and activo = 0'

conection.query(consulta, [id], (err, results) => {
    if (err) throw err
    if (results.affectedRows === 0) {
        res.status(404).json({message:'Producto no encontrado'})
    } else {
        res.json({message:'Producto restaurado'})
    }
   
})
}

const buscarProductosActivos = (req, res) => {
    const nombre = req.query.nombre
    const consulta = `SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.nombre LIKE ?
AND p.activo = 1`

    conection.query(consulta, [`%${nombre}%`], (err, results) =>{
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        res.json(results);
    })
}

const buscarProductosPorCategoria = (req, res) => {
    const { categoria_id } = req.query;

    const consulta = `
        SELECT
            p.*,
            c.nombre AS categoria,
            ip.url AS imagen
        FROM productos p
        INNER JOIN categorias c
            ON p.categoria_id = c.id
        LEFT JOIN imagenes_producto ip
            ON p.id = ip.producto_id
            AND ip.principal = 1
        WHERE p.categoria_id = ?
        AND p.activo = 1
    `;

    conection.query(consulta, [categoria_id], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron productos'
            });
        }

        res.json(results);
    });
};




const productosSinStock = (req, res) => {
    const consulta = `SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.stock = 0
AND p.activo = 1`
    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

const productosStockBajo = (req, res) => {
    const consulta = `
        SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.stock <= p.stock_minimo
AND p.stock > 0
AND p.activo = 1
    `;

    conection.query(consulta, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const productosStockNormal = (req, res) => {
    const consulta = `
        SELECT
    p.*,
    ip.url AS imagen
FROM productos p
LEFT JOIN imagenes_producto ip
    ON p.id = ip.producto_id
    AND ip.principal = 1
WHERE p.stock > p.stock_minimo
AND p.activo = 1
    `;

    conection.query(consulta, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};


module.exports = {getAllProductsActives, getOneProductActive, updateProducts, createProducts, deleteProducts, getAllProductsInactives, getOneProductInactive, restoreProducts, buscarProductosActivos, buscarProductosPorCategoria, productosSinStock, productosStockBajo, productosStockNormal}