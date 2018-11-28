'use strict'

let { headquarter } = require('../entities/Headquarter')
let { space } = require('../entities/Space')

let { save, update, find, remove } = require('../repository/crud')

exports.saveSpace = async (req, res) => {

    // let newHeadquarter = new headquarter({
    //     direction: 'Salud Publica',
    //     phone : 2198523
    //   })
    
    //   await save(newHeadquarter)

    // let newSpace = new space({
    //     headquarter: newHeadquarter,
    //     name: 'Plazoleta Central',
    //     quantity: 3
    //   })

    //   await save(newSpace)

    let filter = {}
    let projection = '-_id -__v'
    let result = await find(space, filter, projection, 'headquarter')

      res.send(result)
}
