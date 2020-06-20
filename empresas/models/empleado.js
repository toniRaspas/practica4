const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })

}
//voy a crear un nuevo usuario.Esto me sirve pa estudiarmelo despues del bootcamp pa cuando quiera crear un usuario

const create = ({ nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into empleados(nombre, dni, sexo, fecha_nac, salario, cargo, fK_departamento) values (?, ?, ?, ?, ?, ?, ?)',
            [nombre, dni, sexo, fecha_nac, salario, cargo, fk_departamento],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    })
}
const deleteById = (pId) => {
    //console.log('pepe', pId);

    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id = ?', [pId], (err, result) => {
            if (err) reject(err);

            resolve(result)
        });
    });
}
const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);

            resolve(rows);
        })
    });
};
const updateById = (pId, { nombre, dni, sexo, fecha_nac, salario, cargo }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update empleados set nombre = ?, dni = ?, sexo = ?, fecha_nac = ?, salario = ?, cargo = ? where id = ?',
            [nombre, dni, sexo, fecha_nac, salario, cargo, pId],
            (err, result) => {
                if (err) reject(err);
                //console.log(result)
                resolve(result);
                console.log(result)
            })
    });
}



module.exports = {
    getAll, deleteById, create, getById, updateById
}

