const express = require('express');
const router = express.Router();

const {getDevice, getOneDevice, createDevice, updateDevice, deleteDevice} = require('../deviceController')


router.get('/', getDevice)
router.get('/:id', getOneDevice)

router.post('/', createDevice)
router.put('/:id', updateDevice)
router.delete('/:id', deleteDevice)

module.exports = router;