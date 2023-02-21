import { useState, useEffect } from 'react';
import './WarehouseAdd.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import backLogo from '../../assets/icon/arrow_back-24px.svg'

function WarehouseAdd({ api }) {
  document.title = "InStock Add Warehouse"
  const initialValues = { warehouse_name: "", address: "", city: "", country: "", contact_name: "", contact_position: "", contact_phone: "", contact_email: "" }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const warehouseNameField = document.querySelector('#warehouse_name')
  const addressField = document.querySelector('#address')
  const cityField = document.querySelector('#city')
  const countryField = document.querySelector('#country')
  const contactNameField = document.querySelector('#contact_name')
  const contactPositionField = document.querySelector('#contact_position')
  const contactPhoneField = document.querySelector('#contact_phone')
  const contactEmailField = document.querySelector('#contact_email')
  const navigateHome = () => {
    navigate('/')
  }

  const handleChange = (event) => {
    // console.log(event.target)
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value })
  };
  
  const handelSubmit = (event) => {
    event.preventDefault();
    if (JSON.stringify(initialValues) === JSON.stringify(formValues)) {
      alert("Please enter your warehouse information")
    } else {
     setFormErrors(validate(formValues));
    setIsSubmit(true);
    }
  };
  
  let navigate = useNavigate()
  function addWarehouse() {
    axios.post(api + '/warehouse', formValues).then(() => {
      alert("Warehouse Added")
      navigate('/')
    }).catch(err => console.log(err))

  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      addWarehouse()
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    if (!values.warehouse_name) {
      errors.warehouse_name = 'Warehouse Name is required'
      warehouseNameField.style.border = "1px solid red";
    } else {
      warehouseNameField.style.border = "";
    }
    if (!values.address) {
      errors.address = 'Street Address is required'
      addressField.style.border = "1px solid red";
    } else {
      addressField.style.border = "";
    }
    if (!values.city) {
      errors.city = 'City is required'
      cityField.style.border = "1px solid red";
    } else {
      cityField.style.border = "";
    }
    if (!values.country) {
      errors.country = 'Country is required'
      countryField.style.border = "1px solid red";
    } else {
      countryField.style.border = "";
    }
    if (!values.contact_name) {
      errors.contact_name = 'Contact details is required'
      contactNameField.style.border = "1px solid red";
    } else {
      contactNameField.style.border = "";
    }
    if (!values.contact_position) {
      errors.contact_position = 'Position is required'
      contactPositionField.style.border = "1px solid red";
    } else {
      contactPositionField.style.border = "";
    }
    if (!values.contact_phone) {
      errors.contact_phone = 'Phone number is required'
      contactPhoneField.style.border = "1px solid red";
    } else if (!phoneRegex.test(values.contact_phone)) {
      errors.contact_phone = 'This is not a valid phone number'
      contactPhoneField.style.border = "1px solid red";
    } else {
      contactPhoneField.style.border = "";
    }
    if (!values.contact_email) {
      errors.contact_email = 'Email is required'
      contactEmailField.style.border = "1px solid red";
    } else if (!regex.test(values.contact_email)) {
      errors.contact_email = 'This is not a valid contact_email format!'
      contactEmailField.style.border = "1px solid red";
    } else {
      contactEmailField.style.border = "";
    }
    return errors;
  }
  return (
    <div className='warehouseAdd'>
      {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='warehouseAdd-success'>New Warehouse successfully added.</div>
      ) : (
        <pre></pre>
      )}
      <h1 className='warehouseAdd-header'> <img className='warehouseAdd-back' src={backLogo} alt="" onClick={navigateHome} />Add New Warehouse</h1>
      <form id='warehouseAdd' className='warehouseAdd-form'
        onSubmit={handelSubmit}>
        <div className='warehouseAdd-form__details'>
          <h2 className='warehouseAdd-form__title'>Warehouse Details</h2>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="warehouse_name">Warehouse Name </label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Warehouse Name'
              type="text"
              id='warehouse_name'
              name='warehouse_name'
              value={formValues.warehouse_name}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.warehouse_name}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="address">Street Address </label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Street Address'
              type="text" id='address'
              name='address'
              value={formValues.address}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.address}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="city">City</label>
            <input className='warehouseAdd-form__inputs'
              placeholder='City'
              type="text"
              id='city'
              name='city'
              value={formValues.city}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.city}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="country">Country </label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Country'
              type="text" id='country' name='country' value={formValues.country}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.country}</p>
          </div>
        </div>
        <div className='warehouseAdd-form__contact'>
          <h2 className='warehouseAdd-form__title'>Contact Details</h2>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="contact_name">Contact Name</label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Contact Name'
              type="text" id='contact_name'
              name='contact_name'
              value={formValues.contact_name}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.contact_name}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="contact_position">Position</label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Position'
              type="text" id='contact_position'
              name='contact_position'
              value={formValues.contact_position}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.contact_position}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="contact_phone">Phone Number</label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Phone Number'
              type="text"
              id='contact_phone'
              name='contact_phone'
              value={formValues.contact_phone}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.contact_phone}</p>
          </div>
          <div className='warehouseAdd-form__container'>
            <label className='warehouseAdd-form__label' htmlFor="contact_email">Email</label>
            <input className='warehouseAdd-form__inputs'
              placeholder='Email'
              type="contact_email"
              id='contact_email'
              name='contact_email'
              value={formValues.contact_email}
              onChange={handleChange}
            />
            <p className='warehouseAdd-form__error'>{formErrors.contact_email}</p>
          </div>
        </div>
      </form>
      <div className='warehouseAdd-buttons'>
        <button className='warehouseAdd-buttons__cancel' form='warehouseAdd' onClick={navigateHome}>Cancel</button>
        <button className='warehouseAdd-buttons__save' form='warehouseAdd'>+ Add Warehouse</button>
      </div>
    </div>
  )
}
export default WarehouseAdd;
