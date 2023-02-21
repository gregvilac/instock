const express = require('express')
const router = express.Router();
const warehouseController = require('../controllers/warehouseController')
router.use(express.json())

router.route('/').get(warehouseController.index)
                .post(warehouseController.addWarehouse)
                
router.route('/:warehouseid').get(warehouseController.getWarehouseDetail)
                             .delete(warehouseController.delWarehouse)
                             .put(warehouseController.updateWarehouse)


router.route('/:warehouseid/inventory').get(warehouseController.getInventoryForWarehouse)   

module.exports = router;