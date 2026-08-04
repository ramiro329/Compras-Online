const { conection } = require('../Config/database')

// Obtener todas las categorías activas
const getAllCategoriesActives = (req, res) => {
    const consulta = 'SELECT * FROM categorias WHERE activo = 1'

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener todas las categorías inactivas
const getAllCategoriesInactives = (req, res) => {
    const consulta = 'SELECT * FROM categorias WHERE activo = 0'

    conection.query(consulta, (err, results) => {
        if (err) throw err
        res.json(results)
    })
}

// Obtener una categoría activa
const getOneCategoryActive = (req, res) => {
    const id = req.params.id

    const consulta = 'SELECT * FROM categorias WHERE id = ? AND activo = 1'

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' })
        }

        res.json(results)
    })
}

// Obtener una categoría inactiva
const getOneCategoryInactive = (req, res) => {
    const id = req.params.id

    const consulta = 'SELECT * FROM categorias WHERE id = ? AND activo = 0'

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' })
        }

        res.json(results)
    })
}

// Crear categoría
const createCategory = (req, res) => {
    const { nombre, descripcion, imagen_url } = req.body

    const consulta = `
        INSERT INTO categorias
        (nombre, descripcion, imagen_url)
        VALUES (?, ?, ?)
    `

    conection.query(
        consulta,
        [nombre, descripcion, imagen_url],
        (err, results) => {
            if (err) throw err

            res.json({ message: 'Categoría creada' })
        }
    )
}

// Actualizar categoría
const updateCategory = (req, res) => {
    const id = req.params.id

    const { nombre, descripcion, imagen_url } = req.body

    const consulta = `
        UPDATE categorias
        SET nombre = ?, descripcion = ?, imagen_url = ?
        WHERE id = ? AND activo = 1
    `

    conection.query(
        consulta,
        [nombre, descripcion, imagen_url, id],
        (err, results) => {
            if (err) throw err

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Categoría no encontrada'
                })
            }

            res.json({ message: 'Categoría actualizada' })
        }
    )
}

// Borrado lógico
const deleteCategory = (req, res) => {
    const id = req.params.id

    const consulta = `
        UPDATE categorias
        SET activo = 0
        WHERE id = ? AND activo = 1
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            })
        }

        res.json({ message: 'Categoría eliminada' })
    })
}

// Restaurar categoría
const restoreCategory = (req, res) => {
    const id = req.params.id

    const consulta = `
        UPDATE categorias
        SET activo = 1
        WHERE id = ? AND activo = 0
    `

    conection.query(consulta, [id], (err, results) => {
        if (err) throw err

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Categoría no encontrada'
            })
        }

        res.json({ message: 'Categoría restaurada' })
    })
}

// Buscar categoría por nombre
const searchCategoryByName = (req, res) => {
    const { nombre } = req.query

    const consulta = `
        SELECT *
        FROM categorias
        WHERE nombre LIKE ?
        AND activo = 1
    `

    conection.query(
        consulta,
        [`%${nombre}%`],
        (err, results) => {
            if (err) throw err

            res.json(results)
        }
    )
}

module.exports = {
    getAllCategoriesActives,
    getAllCategoriesInactives,
    getOneCategoryActive,
    getOneCategoryInactive,
    createCategory,
    updateCategory,
    deleteCategory,
    restoreCategory,
    searchCategoryByName
}