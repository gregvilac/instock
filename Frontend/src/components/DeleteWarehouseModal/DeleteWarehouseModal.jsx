import './DeleteWarehouseModal.scss';
import close from '../../assets/icon/close-24px.svg';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

function DeleteWarehouseModal({ warehouseId, warehouseName, isShown, deleteRequest, setIsShown }) {

    const ref = useRef();
    useOnClickOutside(ref, () => setIsShown(false));

    const showHideClassName = isShown ? "modal modal--visible" : "modal modal--hidden";
    return (
        <div className={showHideClassName}>
            <div className='modal__main-container' ref={ref}>
                <div className='modal__info-container'>
                    <div className='modal__close'><img onClick={() => setIsShown(false)} src={close} alt="X icon" /></div>
                    <p className='modal__question'>Delete {warehouseName} warehouse?</p>
                    <p className='modal__confirm'>Please confirm that you'd like to delete the {warehouseName} from the list of warehouses. You won't be able to undo this action.</p>
                </div>
                <div className='modal__button-container'>
                    <div className='modal__cancel-button' onClick={function(event){setIsShown(false)}}>Cancel</div>
                    <div className='modal__delete-button' onClick={function(event){deleteRequest(warehouseId); setIsShown(false)}}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarehouseModal;