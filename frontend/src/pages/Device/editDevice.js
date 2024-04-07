import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast';

function EditDevice() {

  const [sNumber, setsNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null); 
  const [status, setStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3005/device/${id}`);
      const data = response.data;
      setsNumber(data.sNumber);
      setType(data.type);
      setStatus(data.status);      
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  const updateDeviceData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sNumber', sNumber);
    formData.append('type', type);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
        const response = await axios.put(`http://localhost:3005/device/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
            toast.success('Data updated successfully');
            console.log('Data updated successfully');
            
            window.location.href = '/manageDevice'; 
        }
    } catch (error) {
        toast.error(error.message);
        console.error(error);
    }
};


const handleImageChange = (e) => {
  setImage(e.target.files[0]); 
}

return (
  <div className="container">
    <div className='container2' style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card mt-5">
                    <div className="card-body">
                        <h2 className='row justify-content-center'>Edit Device Information</h2><br />
                        <form onSubmit={updateDeviceData}>
                            <div className="mb-3">
                                <label htmlFor="sNumber">Serial Number</label>
                                <input
                                    type="text"
                                    id="sNumber"
                                    className="form-control"
                                    value={sNumber}
                                    onChange={(e) => setsNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    className="form-control"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    id="image"
                                    className="form-control"
                                    onChange={handleImageChange} // Handle file input change
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    id="status"
                                    className="form-control"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
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

export default EditDevice;
