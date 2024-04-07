import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Input, Button, Table } from 'antd'; 
import { Link } from 'react-router-dom';

function ManageDevice() {
  const [devices, setDevices] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getDevices = () => {
    
    axios.get("http://localhost:3005/device/")
      .then((res) => {
        setDevices(res.data);
        console.log('Device retrieved:', res.data);
      })
      .catch((err) => {
        console.error('Error retrieving devices:', err);
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Confirmation Needed',
      text: 'Please confirm your action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#4caf50',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`${id}`);
        axios.delete(`http://localhost:3005/device/${id}`)
          .then((res) => {
            setIsSubmitted(!isSubmitted);
            toast.success('Device deleted');
            // Auto-refresh the page
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  };
  

  const handleSearch = (sNumber) => {
    const filteredData = devices.filter(cash =>
      cash.sNumber.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  setDevices(filteredData);
  };

  return (
    <div className="container-fluid mt-5" style={{ width: '100%', margin: '0 auto' }}>
      <div className="row"  style={{ marginTop: '100px' }}>
        <div className="col-md-12">
          
          <Input
                    placeholder="Search by Serial Number"
                    style={{ width: 200, marginBottom: '10px' }}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button type="primary" onClick={handleSearch} style={{ marginBottom: '10px', marginLeft: '10px' }}>Search</Button>
                <Link to="/addDevice">
            <Button type="primary" style={{ marginBottom: '10px', marginLeft: '10px' }}>Add Device</Button>
          </Link>
            <table className="table table-hover" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Serial Number</th>
                  <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Type</th>
                  <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Image</th>
                  <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Status</th>
                  <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device._id}>
                    <td style={{textAlign: 'center' }}>{device.sNumber}</td>
                    <td style={{textAlign: 'center' }}>{device.type}</td>
                    <td style={{textAlign: 'center' }}>{device.image}</td>
                    <td style={{textAlign: 'center' }}>{device.status}</td>
                    <td style={{textAlign: 'center' }}>
                    <div className="btn-group" role="group" aria-label="Edit" style={{ marginRight: '5px' }}>
    <Link to={`/editDevice/${device._id}`} className="btn btn-primary">Edit</Link>
</div>
<div className="btn-group" role="group" aria-label="Delete">
    <button className="btn btn-danger" onClick={() => handleDelete(device._id)}>Delete</button>
</div>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default ManageDevice;
