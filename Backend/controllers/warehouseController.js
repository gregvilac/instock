const express = require('express')
const router = express.Router();
const knex = require('knex')(require('../knexfile'))
router.use(express.json())
const {v4: uuid} = require ('uuid');

exports.index = (_req, res) => {
    knex('warehouses')
    .then((data)=> {
        res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Inventories: ${err}`))
}

exports.addWarehouse = (req, res) => {
    inputData = {
        ...req.body, id: uuid()
    }
    if(!req.body.warehouse_name || !req.body.address || !req.body.city || !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email)
    {return res.status(400).send(`Please provide all the required fields.`)}
    knex('warehouses')
    .insert(inputData)
    .then((data) => {
        res.status(201).json(inputData)
    })
    .catch((err)=> {
        res.status(500).send(`Fail to create warehouse ${req.body.warehouse_name} ${err}`)
    })
};

exports.getWarehouseDetail = (req, res) => {
    //
    knex('warehouses')
    .where ({id : req.params.warehouseid})
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((error)=> {
        res.status(400).send(`Error retrieving warehouse data: ${error}`)
    })
}

exports.delWarehouse = (req, res) => {
    //
    knex('warehouses')
        .where ("id",  req.params.warehouseid)
        .delete()
        .then(()=> {
            res.status(200).send(`Warehouse #${req.params.warehouseid} was deleted.`)
        })
        .catch((err)=> {
            res.status(500).send(`Failed to delete warehouse with id${req.params.warehouseid}`)
        })
}

exports.updateWarehouse = (req, res) => {
    inputData = {
        ...req.body, updated_at: knex.fn.now()
    }
    //
    knex('warehouses')
    .where({id : req.params.warehouseid})
    .update(inputData)
    .then(() => {
        res.status(200).send(`Warehouse #${req.params.warehouseid} was updated`)
    })
    .catch((err)=> {
        res.status(500).send(`Warehouse #${req.params.warehouseid} could not be updated: ${err}`)
    })
}

exports.getInventoryForWarehouse = (req, res) => {
    //
    knex('inventories')
    .where({warehouse_id : req.params.warehouseid})
    .then((data)=> res.status(200).json(data))
    .catch((error)=> res.status(400).send(`Failed retrieving Warehouse data: ${error}`))
}

module.export = router;