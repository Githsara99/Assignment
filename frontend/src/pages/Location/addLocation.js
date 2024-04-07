import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link component
import Select from 'react-select';

function AddLocation() {
    const [sname, setsName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [devices, setDevices] = useState([{ name: '' }]);
    
    const handleReset = () => {
        setsName('');
        setAddress('');
        setPhone('');
        setDevices([{ name: '' }]);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const allData = { sname, address, phone, devices};

        axios.post("http://localhost:3005/location/", allData)
            .then(res => {
                toast.success('Location added');
                console.log('Location added');
                handleReset();
                // Redirect to ManageLocation page after adding
                window.location.href = '/manageLocation'; // You can use this or Link component for more optimized routing
            }).catch(err => {
                toast.error(err.message);
                console.log(err.message);
            })
    }

    const handleAddDevices = () => {
        setDevices([...devices, { name: '' }]);
    }

    const handleDeviceChange = (index, value) => {
        const updatedDevices = [...devices];
        updatedDevices[index].name = value;
        setDevices(updatedDevices);
    }

    return (
        <div className="container">
            <div className='container2' style={{ marginTop: '100px', border: '2px solid #ccc', borderRadius: '10px', padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='row justify-content-center'>Add Location Details</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="sname" className="form-label">Name</label>
                                <input type="text" className="form-control" id="sname" value={sname} onChange={(e) => setsName(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Telephone</label>
                                <input type="tel" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}" placeholder="0 xx xxx xxxx" />
                            </div>
                            {devices.map((device, index) => (
                                <div key={index} className="mb-3">
                                    <label htmlFor={`devices${index}`} className="form-label">Devices</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id={`devices${index}`} value={device.name} onChange={(e) => handleDeviceChange(index, e.target.value)} />
                                        {index === devices.length - 1 && <button type="button" className="btn btn-outline-secondary" onClick={handleAddDevices}>+</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Add</button>
                                {/* Link to ManageLocation page */}
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddLocation;
