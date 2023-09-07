import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";

import './App.css';

const ModalTitle = styled("h2")(({ theme }) => ({
  color: "white",
  marginBottom: theme.spacing(3),
}));
export default function App() {
  const [products, setProducts] = useState([]);
  const [productInpName, setProductInpName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenNew, setModalOpenNew] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputUnit, setInputUnit] = useState("");

  useEffect(() => {
    if (productInpName === '') {

      const storedProducts = JSON.parse(localStorage.getItem("products"));
      if (storedProducts) {
        setProducts(storedProducts);
      } else {
        setProducts([
          { name: "Apple", quantity: 10, unit: "kgs" },
          { name: "Banana", quantity: 15, unit: "dozen" }
        ]);
      }
    } else {

      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(productInpName.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }, [productInpName, products]);



  const handleIncrement = (index) => {
    setModalAction("+");
    setSelectedProductIndex(index);
    setModalOpen(true);
  };

  const handleDecrement = (index) => {
    setModalAction("-");
    setSelectedProductIndex(index);
    setModalOpen(true);
  };

  const handleNumberInputSubmit = () => {
    if (modalAction === "+" && inputValue !== "") {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex].quantity += Number(inputValue);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else if (modalAction === "-" && inputValue !== "") {
      const updatedProducts = [...products];
      updatedProducts[selectedProductIndex].quantity -= Number(inputValue);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      alert("fill all the fields");
    }

    setInputValue("");
    setModalOpen(false);
    setModalAction(null);
    setSelectedProductIndex(null);
  };

  const handleCloseModal = () => {
    setInputValue("");
    setModalOpen(false);
    setModalAction(null);
    setSelectedProductIndex(null);
  };

  const handleCloseModalNew = () => {
    setInputName("");
    setInputQuantity("");
    setInputUnit("");
    setModalOpenNew(false);
  };
  const handleAddModalOpen = () => {
    setModalOpenNew(true);
  };

  

  const handleUpdate = (index) => {
    setModalOpenNew(true);
    setSelectedProductIndex(index); // Set the selected product index
    setInputName(products[index].name);
    setInputQuantity(products[index].quantity);
    setInputUnit(products[index].unit);
  };
  
  const handleNew = () => {
    setModalOpenNew(false);
  
    if (inputName && inputQuantity && inputUnit) {
      const updatedProducts = [...products];
  
      if (selectedProductIndex !== null) {
       
        updatedProducts[selectedProductIndex] = {
          name: inputName,
          quantity: Number(inputQuantity),
          unit: inputUnit,
        };
      } else {
        
        const newProduct = {
          name: inputName,
          quantity: Number(inputQuantity),
          unit: inputUnit,
        };
        updatedProducts.push(newProduct);
      }
  
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      alert("Fill in all the fields");
    }
  
    setInputName("");
    setInputQuantity("");
    setInputUnit("");
    setSelectedProductIndex(null); 
  };
  
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };


  const handleproductInpNameChange = (event) => {
    setProductInpName(event.target.value);
  };



  return (
    <div className="main">
      <div className="nav">
        <div className="logo" ><h2 className="heading">IMS</h2>
        <p>Inventory Management System</p>
        </div>
        
        <div className="search-add"> 
        <TextField
          id="outlined-basic"
          label="Enter Product Name"
          className="addButton"
          variant="outlined"
          onChange={handleproductInpNameChange}
          value={productInpName}
          InputLabelProps={{
            style: { color: 'white'}, 
          }}
          InputProps={{
            style: { color: 'white' }, 
          }}
        />
       < Button className="custom-action-button" variant="contained" onClick={handleAddModalOpen}>
          Add Item
        </Button>
        </div>
      </div>

      <Modal open={modalOpenNew} onClose={handleCloseModalNew}>
        <div className="custom-modal-content">
    
          { selectedProductIndex ?  <ModalTitle>Update Item</ModalTitle> : <ModalTitle>Add New Item</ModalTitle>}
          <TextField
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            label="Enter Product Name"
            className="custom-text-field"
            InputLabelProps={{
              style: { color: 'white'}, 
            }}
            InputProps={{
              style: { color: 'white' }, 
            }}
          />
          <TextField
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            label="Enter Unit"
            className="custom-text-field"
            InputLabelProps={{
              style: { color: 'white'}, 
            }}
            InputProps={{
              style: { color: 'white' }, 
            }}
          />
          <TextField
            type="number"
            value={inputQuantity}
            onChange={(e) => setInputQuantity(e.target.value)}
            label="Enter Quantity"
            className="custom-text-field"
            InputLabelProps={{
              style: { color: 'white'}, 
            }}
            InputProps={{
              style: { color: 'white' }, 
            }}
          />
          <Button
            variant="contained"
            onClick={handleNew}
            className="custom-submit-button"
          >
            Submit
          </Button>
        </div>
      </Modal>
      <div className="container">
        <TableContainer className="custom-table-container" component={Paper}>
          <Table className="custom-table">
            <TableHead>
              <TableRow className="custom-table-row">
                <TableCell className="custom-table-cell">Product Name</TableCell>
                <TableCell className="custom-table-cell">Quantity</TableCell>
                <TableCell className="custom-table-cell">Unit</TableCell>
                <TableCell className="custom-table-cell">Action</TableCell>
                <TableCell className="custom-table-cell">Delete Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow className="custom-table-row" key={index}>
                  <TableCell className="custom-table-cell" sx={{cursor:"pointer"}}  onClick={() => handleUpdate(index)}>{product.name}</TableCell>
                  <TableCell className="custom-table-cell">{product.quantity}</TableCell>
                  <TableCell className="custom-table-cell">{product.unit}</TableCell>
                  <TableCell className="custom-table-cell">
                    <div className="idcontainer">
                      <Button className="custom-action-button" variant="contained" onClick={() => handleIncrement(index)}>+</Button>
                      <Button className="custom-action-button" variant="contained" onClick={() => handleDecrement(index)}>-</Button>
                    </div>
                  </TableCell>
                  <TableCell className="custom-table-cell"> <Button variant="contained" onClick={() => handleDelete(index)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="custom-modal-content">
        {modalAction === "+" ? (
      <ModalTitle>Add Quantity</ModalTitle>
    ) : (
      <ModalTitle>Subtract Quantity</ModalTitle>)}
          <TextField
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Enter Number"
            className="custom-text-field"
            InputLabelProps={{
              style: { color: 'white'}, 
            }}
            InputProps={{
              style: { color: 'white' }, 
            }}
          />
          <Button className="custom-submit-button" variant="contained" onClick={handleNumberInputSubmit}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

