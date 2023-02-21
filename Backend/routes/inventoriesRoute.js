const express = require('express')
const router = express.Router();
const inventoryController = require('../controllers/inventoryController')
router.use(express.json())

router.route('/').get(inventoryController.index)
                .post(inventoryController.addInventoryItem);

router.route('/:itemid').get(inventoryController.getInventoryItemDetail)
                        .delete(inventoryController.delItem)
                        .put(inventoryController.updateItem)
module.exports = router;