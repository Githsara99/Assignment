import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast';

function EditLocation() {

  const [sname, setsName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [devices, setDevices] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3005/location/${id}`);
      const data = response.data;
      setsName(data.sname);
      setAddress(data.address);
      setPhone(data.phone);
      setDevices(data.devices);      
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  const updateDeviceData = async (e) => {
    e.preventDefault();
    const deviceData = {
      sname: sname,
      address: address,
      phone: phone,
      devices: devices,      
    };

    try {
        const response = await axios.put(`http://localhost:3005/location/${id}`, deviceData);
        if (response.status === 200) {
            toast.success('Data updated successfully');
            console.log('Data updated successfully');
            // Redirect to ManageLocation page after updating
            window.location.href = '/manageLocation'; // You can use this or Link component for more optimized routing
        }
    } catch (error) {
        toast.error(error.message);
        console.error(error);
    }
}

return (
  <div className="container">
    <div className='container2' style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-5">
                    <div className="card-body">
                        <h2 className='row justify-content-center'>Edit Location Information</h2><br />
                        <form onSubmit={updateDeviceData}>
                            <div className="mb-3">
                                <label htmlFor="regNum">Human Readable Name</label>
                                <input
                                    type="text"
                                    id="sname"
                                    className="form-control"
                                    value={sname}
                                    onChange={(e) => setsName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="students">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="devices">Devices</label>
                                <input
                                    type="text"
                                    id="devices"
                                    className="form-control"
                                    value={devices}
                                    onChange={(e) => setDevices(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

)
}

export default EditLocation;
