const asyncHandler = require('express-async-handler');

const Device = require('../Models//device')

const getDevice = asyncHandler(async (req, res) => {

    const pSearch = req.query.search
    //testing
    //console.log(vSearch)
    let devices

    if(pSearch){
        devices = await Device.find(
            {
                $text: { $search: pSearch }
            }
        )
    }
    else{
         devices = await Device.find();
    }
    
    res.status(200).json(devices);

})
  
const getOneDevice = asyncHandler(async (req, res) => {
    const device = await Device.findById(req.params.id)
  
    if (device) {
        res.status(200).json(device)
    } else {
        res.status(404)
        throw new Error('Device not found')
    }
})
  
const createDevice = asyncHandler(async (req, res) => {
    
    const { sNumber, type, image, status } = req.body;

    if (type !== 'pos' && type !== 'kisok' && type !== 'signage' ) {
        return res.status(400).json({ error: 'Invalid type selection.' });
    }

    if (status !== 'active' && status !== 'inactive') {
        return res.status(400).json({ error: 'Invalid status selection.' });
    }

    const device = new Device({
        sNumber: sNumber,
        type: type,
        image: image, // Assign the array of student names
        status: status
    });

    const savedDevice = await device.save();

    res.status(200).json(savedDevice); 
});


const updateDevice = asyncHandler(async (req, res) => {

    const device = await Device.findById(req.params.id)
  
    if (device) {
  
        const updateDevices = await Device.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updateDevices)

    } else {
        res.status(404)
        throw new Error('Device not found')
    }
  })

const deleteDevice = asyncHandler(async (req, res) => {
    const device = await Device.findById(req.params.id)
  
    if (device) {
        await device.deleteOne();
        res.status(200).json({message: 'Device removed'})
    } else {
        res.status(404)
        throw new Error('Device not found')
    }
})

module.exports = {getDevice, getOneDevice, createDevice, updateDevice, deleteDevice}