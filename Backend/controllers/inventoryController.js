const express = require('express')
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
router.use(express.json())
const {v4: uuid} = require ('uuid');

exports.index = (_req, res) => {
    knex('inventories')
    .then((data)=> {
        res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventories: ${err}`))
}

exports.addInventoryItem = (req, res) => {
    inputData = {
        ...req.body, id: uuid()
    }
    //
    if (!req.body.warehouse_id || !req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity)
    { return res.status(400).send(`Please provide all the required fields.`) }
    knex('inventories')
    .insert(inputData)
    .then((data) => res.status(201).json(inputData))
    .catch((err) => res.status(500).send(`Could not create a entry in the database ${err}`))
}

exports.getInventoryItemDetail = (req, res) => {
    //
    knex('inventories')
        .where ({id : req.params.itemid})
        .then ((data) => res.status(200).json(data))
        .catch ((error) => res.status(400).send(`Error retrieving item data: ${error}`))
}

exports.delItem = (req, res) => {
    //
    knex('inventories')
        .where("id", req.params.itemid)
        .delete()
        .then(() => res.status(200).send(`Item #${req.params.itemid} was deleted.`))
        .catch((err)=> res.status(500).send(`Failed to delete item #${req.params.itemid}: ${err}`))
}

exports.updateItem = (req, res) => {
    inputData = {
        ...req.body, updated_at: knex.fn.now()
    }
    //
    knex('inventories')
    .where({id : req.params.itemid})
    .update(inputData)
    .then(()=> res.status(200).send(`Item #${req.params.itemid} was updated`))
    .catch((err) => res.status(500).send(`Item #${req.params.itemid} could not be updated: ${err}`))
}
module.export = router;