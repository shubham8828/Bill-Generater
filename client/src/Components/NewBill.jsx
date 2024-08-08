import React, { useState } from 'react';
import './NewBill.css'; // Add your CSS for styling
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const NewBill = () => {
  // State for customer details
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    subject: '',
  });

  // State for product entries
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    rate: '',
    quantity: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  // Handle customer data input
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle product input change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Add or update product
  const handleProductSubmit = () => {
    if (editIndex !== null) {
      // Update existing product
      const updatedProducts = products.map((product, index) =>
        index === editIndex ? newProduct : product
      );
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    setNewProduct({ productName: '', rate: '', quantity: '' });
  };

  // Edit a product
  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
  };

  // Delete a product
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      const price = (parseFloat(product.rate) || 0) * (parseFloat(product.quantity) || 0);
      return total + price;
    }, 0).toFixed(2);
  };

  // Print as PDF
  const printAsPDF = () => {
    const act=document.getElementsByClassName('action')
    
  for (let i = 0; i < act.length; i++) {
    act[i].style.display = 'none';
  }

    const input = document.getElementById('pdf-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('bill.pdf');
      for (let i = 0; i < act.length; i++) {
        act[i].style.display = 'block';
      }
    });
  };

  return (
    <div className="billing-page">
      <div className="container">
        <div className="form-container">
          <h1>Billing Page</h1>
          <h2>Product Details</h2>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label>Rate:</label>
            <input
              type="number"
              name="rate"
              value={newProduct.rate}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
            />
          </div>
          <button type="button" onClick={handleProductSubmit}>
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={printAsPDF} className="print-button">
            Print as PDF
          </button>
        </div>

        <div className="table-container" id="pdf-content">
          <h2>Product Table</h2>
          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Product Name</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className='action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const price = (parseFloat(product.rate) || 0) * (parseFloat(product.quantity) || 0);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.rate}</td>
                    <td>{product.quantity}</td>
                    <td>{price.toFixed(2)}</td>
                    <td className='action'>
                      <button onClick={() => handleEdit(index)}><FaEdit/></button>
                      <button onClick={() => handleDelete(index)}><MdDelete /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total Price:</td>
                <td>{calculateTotalPrice()}</td>
                <td></td> {/* Empty cell to align with "Action" column */}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewBill;
