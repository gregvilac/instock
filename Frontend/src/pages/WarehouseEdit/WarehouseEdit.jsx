import './WarehouseEdit.scss'
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import backLogo from '../../assets/icon/arrow_back-24px.svg'

function WarehouseEdit({ api }) {
    const [currentValues, setCurrentValues] = useState();
    const [tempValues, setTempValues] = useState(undefined);
    const [tempErrors, setTempErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { warehouseLocation } = useParams();
    const warehouseNameField = document.querySelector('#warehouseName')
    const addressField = document.querySelector('#streetAddress')
    const cityField = document.querySelector('#city')
    const countryField = document.querySelector('#country')
    const contactNameField = document.querySelector('#contactDetails')
    const contactPositionField = document.querySelector('#position')
    const contactPhoneField = document.querySelector('#phoneNumber')
    const contactEmailField = document.querySelector('#email')
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/')
    }

    useEffect(() => {
        console.log('currentValues', currentValues)
        console.log('tempValues', tempValues)
    });
    const getDetails = useCallback(() => {
        axios
            .get(`${api}/warehouse/${warehouseLocation}`)
            .then((response) => {
                setCurrentValues(response.data[0]);
            })
            .catch((err) => console.log(err))
    }, [api, warehouseLocation])

    useEffect(() => {
        getDetails()
    }, [getDetails]);

    const putWarehouse = useCallback(() => {
        axios
            .put(`${api}/warehouse/${warehouseLocation}`, tempValues)
            .then(() => {
                alert('Warehouse Edited')
                navigate('/')
            }).catch(err => console.log(err))

    }, [api, warehouseLocation, tempValues, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tempValues) {
            navigate('/')
        } else{
            setTempErrors(validate(currentValues));
        setIsSubmit(true); 
        }
       
    };

    useEffect(() => {
        console.log(tempErrors);
        if (Object.keys(tempErrors).length === 0 && isSubmit) {
            console.log(tempValues);
            putWarehouse()
        }
    }, [tempErrors, tempValues, isSubmit, putWarehouse])
    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
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
        currentValues &&
        (
            <div className='warehouseEdit'>
                <h1 className='warehouseEdit-header'><img src={backLogo} alt="" onClick={navigateHome} /> Edit Warehouse</h1>

                <form id='warehouseEdit' className='warehouseEdit-form' onSubmit={handleSubmit}>
                    <div className='warehouseEdit-form__details'>
                        <h2 className='warehouseEdit-form__title'>Warehouse Details</h2>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="warehouseName">Warehouse Name </label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Warehouse Name'
                                type="text" id='warehouseName'
                                name='warehouseName'
                                value={currentValues.warehouse_name}
                                onChange={(e) => { setTempValues({ ...tempValues, warehouse_name: e.target.value }); setCurrentValues({ ...currentValues, warehouse_name: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.warehouse_name}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="streetAddress">Street Address </label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Street Address'
                                type="text" id='streetAddress'
                                name='streetAddress'
                                value={currentValues.address}
                                onChange={(e) => { setTempValues({ ...tempValues, address: e.target.value }); setCurrentValues({ ...currentValues, address: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.address}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="city">City</label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='City'
                                type="text" id='city'
                                name='city'
                                value={currentValues.city}
                                onChange={(e) => { setTempValues({ ...tempValues, city: e.target.value }); setCurrentValues({ ...currentValues, city: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.city}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="country">Country </label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Country'
                                type="text" id='country'
                                name='country'
                                value={currentValues.country}
                                onChange={(e) => { setTempValues({ ...tempValues, country: e.target.value }); setCurrentValues({ ...currentValues, country: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.country}</p>
                        </div>
                    </div>
                    <div className='warehouseEdit-form__contact'>
                        <h2 className='warehouseEdit-form__title'>Contact Details</h2>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="contactDetails">Contact Name</label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Contact Name'
                                type="text" id='contactDetails'
                                name='contactDetails'
                                value={currentValues.contact_name}
                                onChange={(e) => { setTempValues({ ...tempValues, contact_name: e.target.value }); setCurrentValues({ ...currentValues, contact_name: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.contact_name}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="position">Position</label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Position'
                                type="text" id='position'
                                name='position'
                                value={currentValues.contact_position}
                                onChange={(e) => { setTempValues({ ...tempValues, contact_position: e.target.value }); setCurrentValues({ ...currentValues, contact_position: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.contact_position}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="phoneNumber">Phone Number</label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Phone Number'
                                type="text" id='phoneNumber'
                                name='phoneNumber'
                                value={currentValues.contact_phone}
                                onChange={(e) => { setTempValues({ ...tempValues, contact_phone: e.target.value }); setCurrentValues({ ...currentValues, contact_phone: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.contact_phone}</p>
                        </div>
                        <div className='warehouseEdit-form__container'>
                            <label className='warehouseEdit-form__label' htmlFor="email">Email</label>
                            <input className='warehouseEdit-form__inputs'
                                placeholder='Email'
                                type="email" id='email'
                                name='email'
                                value={currentValues.contact_email}
                                onChange={(e) => { setTempValues({ ...tempValues, contact_email: e.target.value }); setCurrentValues({ ...currentValues, contact_email: e.target.value }) }}
                            />
                            <p className='warehouseEdit-form__error'>{tempErrors.contact_email}</p>
                        </div>
                    </div>
                </form>
                <div className='warehouseEdit-buttons'>
                    <button className='warehouseEdit-buttons__cancel' form='warehouseEdit' onClick={navigateHome}>Cancel</button>
                    <button className='warehouseEdit-buttons__save' form='warehouseEdit' onClick={handleSubmit}>Save</button>
                </div >
            </div >
        )
    )
}
export default WarehouseEdit;
