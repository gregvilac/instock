import './WarehouseListItem.scss';    
import trashcan from '../../assets/icon/delete_outline-24px.svg';  
import edit from '../../assets/icon/edit-24px.svg';  
import chevron from '../../assets/icon/chevron_right-24px.svg';
import DeleteWarehouseModal from '../DeleteWarehouseModal/DeleteWarehouseModal';
import { useState } from "react";
import { Link } from 'react-router-dom';

function WarehouseListItem({id, warehouseName, address, city, country, contactName, contactPhone, contactEmail, deleteRequest}) {

    const [isShown, setIsShown] = useState(false);
    

    return (
        <li className='Warehouse'>
            <div className='Warehouse__list-item'>
                <div className='Warehouse__main-container'>

                    <div className='Warehouse__sub-container Warehouse__sub-container--left'>
                        <div className='Warehouse__info-wrapper'>
                            <p className='Warehouse__warehouse-subtitle'>WAREHOUSE</p>
                            <Link to={`/${id}`}><div className='Warehouse__location'>
                                <p>{warehouseName}</p> 
                                <img src={chevron} alt="right pointing chevron"/>
                            </div></Link>
                        </div>
                        <div className='Warehouse__info-wrapper'>
                            <p className='Warehouse__address-subtitle'>ADDRESS</p>
                            <p className='Warehouse__address'>{address}, {city}, {country}</p>
                        </div>
                    </div>

                    <div className='Warehouse__sub-container'>
                        <div className='Warehouse__info-wrapper'>
                            <p className='Warehouse__name-subtitle'>CONTACT NAME</p>
                            <p className='Warehouse__name'>{contactName}</p>
                        </div>
                        <div className='Warehouse__info-wrapper'>
                            <p className='Warehouse__contact-subtitle'>CONTACT INFORMATION</p>
                            <div className='Warehouse__contact-container'>
                                <p className='Warehouse__phone'>{contactPhone}</p>
                                <p className='Warehouse__email'>{contactEmail}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='Warehouse__actions-container'>
                    <div className='Warehouse__delete-button' onClick={() => setIsShown(true)}><img src={trashcan} alt="trashcan icon" /></div>
                    <DeleteWarehouseModal warehouseId={id} warehouseName={warehouseName} deleteRequest={deleteRequest} isShown={isShown} setIsShown={setIsShown}/>
                    <Link to={`/${id}/edit`}><div className='Warehouse__edit-button'><img className='Warehouse__edit-img' src={edit} alt="edit icon" /></div></Link>
                </div>
            </div>
        </li>
    )
}        

export default WarehouseListItem;