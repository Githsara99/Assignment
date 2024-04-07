const asyncHandler = require('express-async-handler');

const Location = require('../Models/location')

const getLocations = asyncHandler(async (req, res) => {

    const pSearch = req.query.search
    //testing
    //console.log(vSearch)
    let locations

    if(pSearch){
        locations = await Location.find(
            {
                $text: { $search: pSearch }
            }
        )
    }
    else{
         locations = await Location.find();
    }
    
    res.status(200).json(locations);

})
  
const getOneLocation = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id)
  
    if (location) {
        res.status(200).json(location)
    } else {
        res.status(404)
        throw new Error('Location not found')
    }
})
  
const createLocation = asyncHandler(async (req, res) => {
    
    const { sname, address, phone, devices } = req.body;

    const deviceNames = devices.map(device => device.name); 

    const location = new Location({
        sname: sname,
        address: address,
        phone: phone,
        devices: deviceNames,
    });

    const savedName = await location.save();

    res.status(200).json(savedName); 
});


const updateLocation = asyncHandler(async (req, res) => {

    const location = await Location.findById(req.params.id)
  
    if (location) {
  
        const updateLocations = await Location.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updateLocations)

    } else {
        res.status(404)
        throw new Error('Location not found')
    }
  })

const deleteLocation = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id)
  
    if (location) {
        await location.deleteOne();
        res.status(200).json({message: 'Location removed'})
    } else {
        res.status(404)
        throw new Error('Location not found')
    }
})

module.exports = {getLocations, getOneLocation, createLocation, updateLocation, deleteLocation}