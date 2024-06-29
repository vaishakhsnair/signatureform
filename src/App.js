import React, { useState, useRef } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink,Image } from '@react-pdf/renderer';
import toImg from 'react-svg-to-image';
import Signature from '@uiw/react-signature';
import './App.css';

// Updated styles for PDF document and form
const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#E4E4E4', padding: 20,alignItems: 'center', justifyContent: 'center'},
  section: { margin: 10, padding: 10, flexGrow: 1 },
  signatureImage: { width: 300, height: 150 },
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  input: { margin: '10px 0', padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { margin: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' },
  signatureBox: { border: '1px solid #ccc', borderRadius: '5px', margin: '10px 0' },
});
const PDFDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Name: {formData.name}</Text>
        <Text>Email: {formData.email}</Text>
        <Text>Signature:</Text>
        {/* Render the signature as an image */}
        <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(formData.signature)}`} style={styles.signatureImage} />
      </View>
    </Page>
  </Document>
);

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', signature: '' });
  const signatureRef = useRef();
  

  const handleClear = () => signatureRef.current.clear();
  const handleSave = () => {
    // Directly accessing the SVG element or its equivalent property on signatureRef.current
    const svgElement = signatureRef.current?.svg?.cloneNode(true); // Adjusted to directly access an svg property
    if (!svgElement) return; // Exit if svgElement is not available

    const clientWidth = svgElement.clientWidth || 300; // Default width if not available
    const clientHeight = svgElement.clientHeight || 150; // Default height if not available

    svgElement.removeAttribute('style');
    svgElement.setAttribute('width', `${clientWidth}px`);
    svgElement.setAttribute('height', `${clientHeight}px`);
    svgElement.setAttribute('viewBox', `0 0 ${clientWidth} ${clientHeight}`);

    const data = new XMLSerializer().serializeToString(svgElement);
    
    // Continue with the rest of the original handleSave function...
    console.log(data)
    
    
    setFormData({ ...formData, signature: data });


  };

  const showSignature = () => {
    return (
      <div>
        <h2>Signature</h2>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(formData.signature)}`} alt="signature" style={{ width: '300px', height: '150px' }} />
      </div>
    )
  }
  return (
    <div className="App" style={{ marginTop: '20px' }}>
      <form style={styles.form}>
        <input style={styles.input} type="text" name="name" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input style={styles.input} type="email" name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <div style={styles.signatureBox}>
          <Signature ref={signatureRef} canvasProps={{ className: 'sigCanvas' }} />
        </div>
        <div>
          <button type="button" style={styles.button} onClick={handleClear}>Clear Signature</button>
          <button type="button" style={styles.button} onClick={handleSave}>Save Signature</button>
        </div>
      </form>
      {formData.name && formData.email && formData.signature && (
        <PDFDownloadLink document={<PDFDocument formData={formData} />} fileName="form-data.pdf" style={styles.button}>
          Download PDF
        </PDFDownloadLink>
      )}
      {formData.signature && showSignature()}
      
    </div>
  );
}

export default App;