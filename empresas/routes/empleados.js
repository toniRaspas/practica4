const router = require('express').Router();
const Empleado = require('../models/empleado');
const { check, validationResult } = require('express-validator');



//async await QUE NOS DEVUELVE TODA LA INFO
//ES LA MAS BASICA Y ME LA TENGO QUE ESTUDIAR
//en departamentos uso el then y el catch

router.get('/', async (req, res) => {
    try {
        const allEmp = await Empleado.getAll();
        res.json(allEmp);
    }
    catch (err) { res.send(err) }
})

router.get('/:pId', (req, res) => {
    Empleado.getById(req.params.pId)
        .then(result => {
            res.json(result)
        }).catch(err => { res.send(err) })
})



router.post('/create', [check('nombre', 'el nombre es obligatorio y mayor de 3 caracteres').exists().isLength({ min: 3 }), check('dni', 'el dni obligatorio').exists().isLength({ max: 9 }).isNumeric(), check('sexo', 'debes añadir un valor F o M').exists(), check('fecha_nac', 'introduce una fecha correcta').exists(), check('salario', 'introduce un sueldo razonable').exists().isLength({ max: 4 }), check('cargo', 'introduce la labor').exists(), check('fk_departamento').exists()],
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.json(errores.array());
        }
        const result = await Empleado.create(req.body);
        if (result['affectedRows'] === 1) {
            const empleado = await Empleado.getById(result['insertId']);
            res.json({ success: 'se ha insertado el cliente', cliente: empleado })
        } else {
            res.json({ error: 'Esto no va' })
        }
    });

router.delete('/delete/:pId', (req, res) => {

    Empleado.deleteById(req.params.pId)
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            res.send(err);
        });
});

router.put('/update/', async (req, res) => {

    const result = await Empleado.updateById(req.body.id, req.body);
    console.log(req.body.id);

    if (result['affectedRows'] === 1) {
        res.json({ success: 'se ha acctualizado el cliente' });
    } else {
        res.json({ error: 'No se ha actualizado' })
    }


});




module.exports = router;


