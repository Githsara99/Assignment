const express = require('express');
const router = express.Router();

const {getLocations, getOneLocation, createLocation, updateLocation, deleteLocation} = require('../locationController')


router.get('/', getLocations)
router.get('/:id', getOneLocation)

router.post('/', createLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

module.exports = router;