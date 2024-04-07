import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';

const Header = () => {
    const [value, setValue] = useState('1');
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const navLabel = ['Location', 'Device'];

    return (
        <Navbar bg="light" expand="lg" className="navbar-small">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {navLabel.map((label, index) => (
                        <Nav.Link key={index} href={`#${index}`}>
                            {label}
                        </Nav.Link>
                    ))}
                </Nav>
                <Nav>
                    <Avatar>S</Avatar>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
