
let save = async (object) => {
    let query = object.save((err, success) => {
        if (err) console.log(err);
    })
    return query.exec()
}

let find = (object, filter, projection) => {
    let query = object.find(filter, projection, (err, success) => {
        if (err) console.log(err);
    })
    return projection ? query.select(projection).exec() : query.exec()
}

let update = (object, name) => {
    let query = object.findOneAndUpdate({ name: name }, { $set: { quantityDevolution: doc[0].quantityDevolution + 1 } },(err) => {
        if (err) console.log(err);
    })
    return query.exec()
}

module.exports = {
    save,
    find,
    update
}

