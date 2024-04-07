import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
//import uploadImage from '../../uploadImage';

function AddDevice() {
    const [sNumber, setsNumber] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");

    const handleReset = () => {
        setsNumber('');
        setType('');
        setImage('');
        setStatus('');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

       // const imageURL = await uploadImage(image);
        const allData = { sNumber, type, image, status };

        try {
            const res = await axios.post("http://localhost:3005/device/", allData);
            if (res.status === 200) {
                toast.success('Device added successfully');
                console.log('Device added successfully');
                handleReset();
            } else {
                toast.error('Failed to add device');
                console.error('Failed to add device');
            }
        } catch (error) {
            toast.error('An error occurred while adding device');
            console.error('An error occurred while adding device:', error);
        }
    }

    return (
        <div className="container">
            <div className='container2' style={{ marginTop: '100px', border: '2px solid #ccc', borderRadius: '10px', padding: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className='row justify-content-center'>Add Device Details</h2>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label htmlFor="sNumber" className="form-label">Serial Number</label>
                                <input type="text" className="form-control" id="sNumber" value={sNumber} onChange={(e) => setsNumber(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type</label>
                                <Select
                                    options={[
                                        { value: 'pos', label: 'pos' },
                                        { value: 'kisok', label: 'kisok' },
                                        { value: 'signage', label: 'signage' },
                                    ]}
                                    value={type ? { value: type, label: type } : null}
                                    onChange={(selectedOption) => setType(selectedOption.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <Select
                                    options={[
                                        { value: 'active', label: 'active' },
                                        { value: 'inactive', label: 'inactive' },
                                    ]}
                                    value={status ? { value: status, label: status } : null}
                                    onChange={(selectedOption) => setStatus(selectedOption.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ marginRight: '10px' }}>Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddDevice;
