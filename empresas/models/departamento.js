const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const deleteDepById = (pId) => {
    //console.log('pepe', pId);

    return new Promise((resolve, reject) => {
        db.query('delete from departamento where id = ?', [pId], (err, result) => {
            if (err) reject(err);

            resolve(result)
        });
    });
};


const create = ({ nombre_departamento, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into departamento(nombre_departamento, ciudad) values (?, ?)',
            [nombre_departamento, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    })
}

const updateById = (pId, { nombre_departamento, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update departamento set nombre_departamento = ?, ciudad = ? where id = ?',
            [nombre_departamento, ciudad, pId],
            (err, result) => {
                if (err) reject(err);
                //console.log(result)
                resolve(result);
                console.log(result)
            })
    });
}


module.exports = {
    getAll, deleteDepById, create, updateById
}