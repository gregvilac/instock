import './Inventoryadd.scss';
import arrowBack from '../../assets/icon/arrow_back-24px.svg';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/icon/error-24px.svg';



function InventoryAdd({ api }) {
  // Setting values to every input fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Gear");
  const [productStatus, setProductStatus] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [warehouseId, setWarehouseId] = useState("150a36cf-f38e-4f59-8e31-39974207372d");
  const [formSubmitted, setFormSubmitted] = useState(false)
  const errorImg = <img src={img} className='errorImg' alt='errImg' />


  // Setting list for warehouses
  const [warehouseList, setWarehouseList] = useState([]);

  // Getting warehouses
  useEffect(() => {
    axios.get("http://localhost:8080/warehouse")
      .then((response) => {
        setWarehouseList(response.data);
        document.title = "InStock Add Inventory"
      })
  }, [api]);

  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    setFormSubmitted(true);
    if (!productName || !productDescription || !productCategory || !productStatus || !warehouseId) {
      alert('Please fill all the fields')

    } else {
      if (productStatus === 'out of stock') {
        setProductQty(0)
      }
      const item = {
        item_name: productName,
        description: productDescription,
        category: productCategory,
        quantity: productQty,
        status: productStatus,
        warehouse_id: warehouseId
      }
      console.log(item);
      axios.post(`http://localhost:8080/inventory/`, item)
        .then((response) => {
          console.log(response.data);
          navigate('/inventory');
        })
    }
  }

  const category = [{
    label: "Accessories",
    value: "Accessories",
  },
  {
    label: "Gear",
    value: "Gear",
  },
  {
    label: "Electronics",
    value: "Electronics",
  },
  {
    label: "Health",
    value: "Health",
  },
  {
    label: "Apparel",
    value: "Apparel",
  }]

  return (
    <div className='add-inventory'>
      <div className='add-inventory__title-wrapper'>
        <Link to={`/inventory`}>
        <img className='add-inventory__svg' src={arrowBack} alt='back arrow' />
        </Link>
        <h1 className='add-inventory__title'>
          Add New Inventory Item
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='add-inventory__container'>
          <div className='add-inventory__details-form'>
            <h2 className='add-inventory__subtitle'>Item Details</h2>
            <div className='add-inventory__subtitle-form'>
              <label htmlFor='ItemName' className='add-inventory__label'>Item Name</label>
              <input type='text' value={productName} onChange={event => setProductName(event.target.value)} name='inputName' id='ItemName' placeholder='Item Name' className={productName ? 'add-inventory__form-field' : 'add-inventory__form-field add-inventory__form-field--invalid'} />

              <div className={formSubmitted && !productName ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Item name is required</div>

              <label htmlFor='Description' className='add-inventory__label'>Description</label>

              <textarea name='description' id='addDescription' cols="20" rows="5" placeholder='Please enter a brief item description' className={productDescription ? 'add-inventory__form-field' : 'add-inventory__form-field add-inventory__form-field--invalid'} value={productDescription} onChange={event => setProductDescription(event.target.value)} />

              <div className={formSubmitted && !productDescription ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Description is required</div>

              <label htmlFor='addCategory' className='add-inventory__label'>Category</label>
              <select name='category' id='editCategory' className={productCategory ? 'add-inventory__form-field' : 'add-inventory__form-field add-inventory__form-field--invalid'} value={productCategory} onChange={event => (setProductCategory(event.target.value))}>

                {/* map method to populate options */
                  category.map(cat => <option key={cat.label} value={cat.value}>{cat.label}</option>)
                }
              </select>
              <div className={formSubmitted && !productCategory ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Please select a category </div>
            </div>
          </div>
          <div className='add-inventory__availability-form'>
            <h2 className='add-inventory__subtitle'>Item Availability</h2>
            <p className='add-inventory__label'>Status</p>
            
            <div className='add-inventory__radio'>
              <div className='add-inventory__radio-option'>  
                <input type='radio' value='in stock' onChange={event => setProductStatus(event.target.value)} name='status' id='inStock' />
                <label htmlFor='inStock' className='add-inventory__p1'>In stock</label>
                <div className={formSubmitted && !productStatus ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Item status is required </div>
              </div>
              <div className='add-inventory__radio-option'>
                <input type='radio' name='status' id='outStock' value='out of stock' onChange={event => setProductStatus(event.target.value)} />
                <label htmlFor='outStock' className='add-inventory__p2'>Out of stock</label>
              </div>
            </div>

            <div className='add-inventory__availability-details'>
              <div className={
                productStatus === 'out of stock' ? 'add-inventory__qty--hidden' : 'add-inventory__qty'
              }>

                <label htmlFor='addWarehouse' className='add-inventory__label'>Quantity</label>
                <input type='number' value={productQty} onChange={event => setProductQty(event.target.value)} name='quantity' id='quantity' placeholder='0' className={productQty ? 'add-inventory__form-field' : 'add-inventory__form-field add-inventory__form-field--invalid'} />

                <div className={formSubmitted && !productQty ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Item quantity is required </div>
              </div>

              <label htmlFor='addWarehouse' className='add-inventory__label'>Warehouse</label>
              <select name='warehouse' id='addWarehouse' className={warehouseId ? 'add-inventory__form-field' : 'add-inventory__form-field add-inventory__form-field--invalid'} value={warehouseId} onChange={(e) => { setWarehouseId(e.target.value) }}
              >
                {/* map method to populate options */
                  warehouseList.map(wh => <option key={wh.id} value={wh.id}>{wh.warehouse_name}</option>)
                }
              </select>
              <div className={formSubmitted && !warehouseId ? 'add-inventory__form-validate' : 'add-inventory__form-validate add-inventory__form-validate--hide'} >{errorImg} Warehouse name is required </div>
            </div>
          </div>
        </div>
        <div className='add-inventory__buttons'>
          <button onClick={() => { navigate("/inventory") }} className='add-inventory__cancel-btn secondary-btn'>Cancel</button>
          <button type='submit' className='add-inventory__submit-btn primary-btn' >+ Add Item</button>
        </div>
      </form>
    </div>
  )
}
export default InventoryAdd;

