import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    padding: 40,
  },
  section: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    color: '#333',
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  field: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  value: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
  },
  signatureImage: {
    width: 200,
    height: 100,
    marginTop: 10,
  },
  signatureSection: {
    marginTop: 20,
    borderTop: '2px dashed #ccc',
    paddingTop: 10,
    alignItems: 'center',
  },
});

const generatePDF = async ({ formData, setLink }) => {
  try {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Personal Information</Text>
            <Text style={styles.field}>Name:</Text>
            <Text style={styles.value}>{formData.name}</Text>
            <Text style={styles.field}>Email:</Text>
            <Text style={styles.value}>{formData.email}</Text>
            <Text style={styles.field}>Address:</Text>
            <Text style={styles.value}>{formData.address}</Text>
            <Text style={styles.field}>Phone:</Text>
            <Text style={styles.value}>{formData.phone}</Text>
            <Text style={styles.field}>Bio:</Text>
            <Text style={styles.value}>{formData.bio}</Text>
            <Text style={styles.field}>Date of Birth:</Text>
            <Text style={styles.value}>{formData.dob}</Text>
            <Text style={styles.field}>Nationality:</Text>
            <Text style={styles.value}>{formData.nationality}</Text>
            <Text style={styles.field}>Gender:</Text>
            <Text style={styles.value}>{formData.gender}</Text>
            <Text style={styles.field}>Marital Status:</Text>
            <Text style={styles.value}>{formData.maritalStatus}</Text>
            <Text style={styles.field}>Occupation:</Text>
            <Text style={styles.value}>{formData.occupation}</Text>
          </View>
          <View style={styles.signatureSection}>
            <Text style={styles.field}>Signature:</Text>
            <Image src={formData.signature} style={styles.signatureImage} />
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);

    if (setLink) setLink(url);

    window.open(url, '_blank');
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default generatePDF;
