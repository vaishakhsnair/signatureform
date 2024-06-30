import React, { useState, useRef } from 'react';
import Signature from '@uiw/react-signature';
import './App.css';
import generatePDF from './PDFHandler';
import Footer from './Footer';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  signatureImage: {
    width: 300,
    height: 150,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  signatureBox: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px 0',
  },
});

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    bio: '',
    dob: '',
    nationality: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    signature: ''
  });
  
  const signatureRef = useRef();
  const [link, setLink] = useState('');

  const handleClear = () => {
    signatureRef.current?.clear();
    setFormData({ ...formData, signature: '' });
  };

  const handleSave = () => {
    const svgElement = signatureRef.current?.svg?.cloneNode(true);
    if (!svgElement) return;

    const clientWidth = svgElement.clientWidth || 300;
    const clientHeight = svgElement.clientHeight || 150;

    svgElement.removeAttribute('style');
    svgElement.setAttribute('width', `${clientWidth}px`);
    svgElement.setAttribute('height', `${clientHeight}px`);
    svgElement.setAttribute('viewBox', `0 0 ${clientWidth} ${clientHeight}`);

    const data = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = clientWidth || 0;
      canvas.height = clientHeight || 0;
      ctx?.drawImage(img, 0, 0);
      setFormData({ ...formData, signature: canvas.toDataURL('image/png') });
    };
    img.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(data)))}`;
  };

  const areAllDetailsAvailable = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const showSignature = () => {
    return (
      <div>
        <h2>Signature</h2>
        <img src={formData.signature} alt="signature" style={styles.signatureImage} />
      </div>
    )
  };

  return (
    <div className="App" style={{ marginTop: '20px' }}>
      <h1>Bio Data Form</h1>
      <form style={styles.form}>
        <input style={styles.input} type="text" name="name" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input style={styles.input} type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input style={styles.input} type="text" name="address" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        <input style={styles.input} type="tel" name="phone" placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <textarea style={styles.input} name="bio" placeholder="Bio" onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows="3"></textarea>
        <input style={styles.input} type="date" name="dob" placeholder="Date of Birth" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
        <input style={styles.input} type="text" name="nationality" placeholder="Nationality" onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} />
        <input style={styles.input} type="text" name="gender" placeholder="Gender" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
        <input style={styles.input} type="text" name="maritalStatus" placeholder="Marital Status" onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })} />
        <input style={styles.input} type="text" name="occupation" placeholder="Occupation" onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} />
        <h2>Signature</h2>
        <div style={styles.signatureBox}>
          <Signature ref={signatureRef} />
        </div>
        <div>
          <button type="button" style={styles.button} onClick={handleClear}>Clear Signature</button>
          <button type="button" style={styles.button} onClick={handleSave}>Save Signature</button>
        </div>
      </form>

      
      {formData.signature && showSignature()}

      <button
        style={{
          ...styles.button,
          backgroundColor: areAllDetailsAvailable() ? '#007bff' : 'grey',
          color: areAllDetailsAvailable() ? 'white' : 'darkGrey',
          cursor: areAllDetailsAvailable() ? 'pointer' : 'not-allowed'
        }}
        onClick={() => generatePDF({ formData, setLink })}
        disabled={!areAllDetailsAvailable()}
      >
        Generate PDF
      </button>

      <Footer />
    </div>
  );
}

export default App
