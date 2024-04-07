import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Input, Button, Table } from 'antd'; 
import { Link } from 'react-router-dom'; // Import Link component

function ManageLocation() {
  const [locations, setLocations] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const getLocations = () => {
    axios.get("http://localhost:3005/location/")
      .then((res) => {
        setLocations(res.data);
        console.log('Location retrieved:', res.data);
      })
      .catch((err) => {
        console.error('Error retrieving locations:', err);
      });
  };

  useEffect(() => {
    getLocations();
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
        axios.delete(`http://localhost:3005/location/${id}`)
          .then((res) => {
            setIsSubmitted(!isSubmitted);
            toast.success('Location deleted');
            // Auto-refresh the page
            window.location.reload();
          })
          .catch((err) => {
            alert(err);
          });
      }
    });
  };

  const handleSearch = (registrationNumber) => {
    const filteredData = locations.filter(cash =>
      cash.sname.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setLocations(filteredData);
  };

  return (
    <div className="container-fluid mt-5" style={{ width: '100%', margin: '0 auto' }}>
      <div className="row"  style={{ marginTop: '100px' }}>
        <div className="col-md-12">
          <Input
            placeholder="Search by name"
            style={{ width: 200, marginBottom: '10px' }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button type="primary" onClick={handleSearch} style={{ marginBottom: '10px', marginLeft: '10px' }}>Search</Button>
          {/* Add Location button */}
          <Link to="/addLocation">
            <Button type="primary" style={{ marginBottom: '10px', marginLeft: '10px' }}>Add Location</Button>
          </Link>
          <table className="table table-hover" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Name</th>
                <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Address</th>
                <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Telephone</th>
                <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Devices</th>
                <th style={{ backgroundColor: '#D9EDF8', fontWeight: 'bolder', fontSize: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td style={{textAlign: 'center' }}>{location.sname}</td>
                  <td style={{textAlign: 'center' }}>{location.address}</td>
                  <td style={{textAlign: 'center' }}>{location.phone}</td>
                  <td style={{textAlign: 'center' }}>{location.devices}</td>
                  <td style={{textAlign: 'center' }}>
                    <div className="btn-group" role="group" aria-label="Edit" style={{ marginRight: '5px' }}>
                      <Link to={`/editLocation/${location._id}`} className="btn btn-primary">Edit</Link>
                    </div>
                    <div className="btn-group" role="group" aria-label="Delete">
                      <button className="btn btn-danger" onClick={() => handleDelete(location._id)}>Delete</button>
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

export default ManageLocation;
