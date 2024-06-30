import React from 'react';

const footerStyle = {
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    padding: '5px',
    position: 'relative',
    left: '0',
    bottom: '0',
    width: '100%',
    borderTop: '1px solid #e7e7e7',
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
};

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>Made with ❤️ by <a href="https://github.com/vaishakhsnair" style={linkStyle}>vaishakhsnair</a></p>

        </footer>
    );
};

export default Footer;