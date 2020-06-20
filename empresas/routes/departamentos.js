const router = require('express').Router();

const Departamento = require('../models/departamento');
const { check, validationResult } = require('express-validator');

//recupera todos los departamntos
router.get('/', async (req, res) => {
    try {
        const allDepts = await Departamento.getAll();
        res.json(allDepts)
    } catch (err) { res.send(err) }
})

router.delete('/delete/:pId', (req, res) => {

    Departamento.deleteDepById(req.params.pId)
        .then(result => {
            console.log(req.params.pId);
            res.redirect('/');
        })
        .catch(err => {
            res.send(err);
        });
});

router.post('/create', [check('nombre_departamento', 'el nombre es obligatorio y mayor de 2 caracteres').exists().isLength({ min: 2 }), check('ciudad').exists()],
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.json(errores.array());
        }
        const result = await Departamento.create(req.body);
        if (result['affectedRows'] === 1) {
            //const departamento = await Departamento.getById(result['insertId']);
            res.json({ success: 'se ha insertado el departamento' })
        } else {
            res.json({ error: 'cago en to lo que se menea, essto no va' })
        }
    });

router.put('/update', async (req, res) => {

    const result = await Departamento.updateById(req.body.id, req.body);
    console.log(req.body.id);

    if (result['affectedRows'] === 1) {
        res.json({ success: 'se ha actualizado el departamento' });
    } else {
        res.json({ error: 'No se ha actualizado' })
    }


});




module.exports = router;