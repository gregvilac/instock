import './InventoryEdit.scss';
import arrowBack from '../../assets/icon/arrow_back-24px.svg';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
//Line 214 - Conditional for quantity / out of stock code.
function InventoryEdit({ api }) {
  // Create states for each key in a product
  const [item_name, setItem_name] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [warehouse_id, setWarehouse_id] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // Create state for inventory and warehouses fetched from DB
  const [inventory, setInventory] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  // Param from the route
  const { product } = useParams();
  // To navigate back from cancel
  const navigate = useNavigate();
  // useEffect to get the array of products from DB and save it to state.
  useEffect(() => {
    console.log(product, `${api}/inventory/`)
    axios.get(`${api}/inventory/`)
      .then((response) => {
        console.log(response.data);
        setInventory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);
  // useEffect to get the array of warehouses from DB and save it to state.
  useEffect(() => {
    axios.get(`${api}/warehouse/`)
      .then((response) => {
        console.log(response.data);
        setWarehouseList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [api]);
  // useEffect to update the state of all of the keys of the current product passed by Params
  useEffect(() => {
    // Find the product by the id passed by Param
    let foundProduct = inventory.find((item) => item.id === product);
    const handleValueChange = (product) => {
      setItem_name(product.item_name);
      setDescription(product.description);
      setCategory(product.category);
      setStatus(product.status);
      setWarehouse_id(product.warehouse_id);
      setQuantity(product.quantity);
    };
    // Once foundProduct is not null perform the handleValueChange function
    if (foundProduct) {
      handleValueChange(foundProduct);
    }
  }, [inventory, product]);
  // Function to get an array of objects with the warehouse id and name in order to populate the warehouse "select" in the form
  const getWarehouses = () => {
    let warehouses = []
    warehouseList.forEach((warehouse) => {
      if (!warehouses.includes(warehouse.warehouse_name)) {
        warehouses.push({ 'id': warehouse.id, 'name': warehouse.warehouse_name })
      }
    })
    return warehouses
  }
  // Function to get an array with the distinct catefory values in order to populate the
  // category "select" in the form
  const getCategories = () => {
    let categories = []
    inventory.forEach((product) => {
      // if the array doesn't have the current category it is pushed to the array
      if (!categories.includes(product.category)) {
        categories.push(product.category)
      }
    })
    return categories
  }
  const validate = (values) => {
    const errors = {}
    if (!values.item_name) {
      errors.item_name = 'An item name is required'
    }
    if (!values.description) {
      errors.description = 'A description is required'
    }
    if (!values.category) {
      errors.category = 'A category is required'
    }
    if (!values.status) {
      errors.status = 'An item status is required'
    }
    if (!values.warehouse_id) {
      errors.warehouse_id = 'A warehouse name is required'
    }
    return errors;
  }
  // Function to verify that all elements have been filled
  const isFormValid = (productObject) => {
    let errors = validate(productObject)
    setFormErrors(errors)
    if (Object.keys(errors).length !== 0) {
      return false;
    }
    return true;
  }
  // Function to handle the submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let tempQuantity = quantity;
    if (status === "Out of Stock") {
      tempQuantity = 0;
      setQuantity(tempQuantity);
    }
    // Object with the current values in the form
    let productObject = {
      warehouse_id: warehouse_id,
      item_name: item_name,
      description: description,
      category: category,
      status: status,
      quantity: tempQuantity
    }
    if (isFormValid(productObject)) {
      setIsSubmit(true);
      // Axios request to update the DB
      axios.put(`${api}/inventory/${product}`, productObject)
        .then(response => {
          console.log(response)
          setTimeout(() => {
            navigate('/inventory')
          }, 2000)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log("Error updating product")
    }
  }
  // When cancel button is clicked you're sent back to the inventory route
  const handleCancelBtn = () => {
    navigate(`/inventory`);
  }
  return (
    <div className="edit-inventory">
      <div className="edit-inventory__title-wrapper">
        <Link to={`/inventory`} className="edit-inventory__link">
          <img src={arrowBack} alt="back arrow" />
        </Link>
        <h1 className="edit-inventory__title">
          Edit Inventory Item
        </h1>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="edit-inventory__container">
          <div className="edit-inventory__details-form">
            <h2 className="edit-inventory__subtitle">Item Details</h2>
            <label htmlFor="editItemName" className="edit-inventory__label">Item Name</label>
            <input type="text" name="item_name" id="editItemName" placeholder="Item name" className={`form-field ${Object.keys(formErrors).includes("item_name") ? "form-field--error" : ""} `} value={item_name} onChange={(event) => setItem_name(event.target.value)} />
            <p className='edit-inventory__error'>{formErrors.item_name}</p>
            <label htmlFor="editDescription" className="edit-inventory__label">Description</label>
            <textarea name="description" id="editDescription" placeholder="Enter description" className={`edit-inventory__textarea ${Object.keys(formErrors).includes("description") ? "edit-inventory__textarea--error" : ""} `} value={description} onChange={(event) => setDescription(event.target.value)} />
            <p className='edit-inventory__error'>{formErrors.description}</p>
            <label htmlFor="editCategory" className="edit-inventory__label">Category</label>
            <select name="category" id="editCategory" className={`form-field ${Object.keys(formErrors).includes("category") ? "form-field--error" : ""} `} value={category} onChange={(event) => { setCategory(event.target.value) }}>
              {getCategories().map((category, index) => {
                return <option key={index} value={category}>{category}</option>
              })}
            </select>
            <p className='edit-inventory__error'>{formErrors.category}</p>
          </div>
          <div className="edit-inventory__availability-form">
            <h2 className="edit-inventory__subtitle">Item Availability</h2>
            <p className="edit-inventory__label">Status</p>
            <div className="edit-inventory__radio">
              <div className="edit-inventory__radio-option">
                <input type="radio" name="status" id="inStock" value="In Stock" checked={status === "In Stock"} onChange={(event) => setStatus(event.target.value)} />
                <label htmlFor="inStock">In stock</label>
              </div>
              <div className="edit-inventory__radio-option">
                <input type="radio" name="status" id="outStock" value="Out of Stock" checked={status === "Out of Stock"} onChange={(event) => {
                  setStatus(event.target.value)
                }} />
                <label htmlFor="outStock">Out of stock</label>
              </div>
            </div>
            <p className='edit-inventory__error'>{formErrors.status}</p>
            <div className={`${status === "Out of Stock" ? "edit-inventory__qty--hidden" : "edit-inventory__qty"}`}>
              <label htmlFor="addItemQty" className="add-inventory__label">Quantity</label>
              <input type="number" name="quantity" id="addItemQty" className="form-field" onChange={(event) => setQuantity(event.target.value)} placeholder={quantity} />
              <p className='add-inventory__error'>{formErrors.quantity}</p>
            </div>
            <label htmlFor="editWarehouse" className="edit-inventory__label">Warehouse</label>
            <select name="warehouse_id" id="editWarehouse" className={`form-field ${Object.keys(formErrors).includes("warehouse_id") ? "form-field--error" : ""} `} value={warehouse_id} onChange={(event) => setWarehouse_id(event.target.value)} > {getWarehouses().map((warehouse) => {
              return <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
            }
            )}
            </select>
            <p className='edit-inventory__error'>{formErrors.warehouse_id}</p>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className='edit-inventory__success'>Item edited successfully.</div>
            ) : (<pre></pre>)}
          </div>
        </div>
        <div className="edit-inventory__buttons">
          <button className="edit-inventory__cancel-btn secondary-btn" onClick={handleCancelBtn}>Cancel</button>
          <button type="submit" className="edit-inventory__submit-btn primary-btn">Save</button>
        </div>
      </form>
    </div>
  )
}
export default InventoryEdit;