import './DeleteInventoryModal.scss';
import closeIcon from '../../assets/icon/close-24px.svg';
import axios from 'axios';

function DeleteInventoryModal({ itemId, name, show, close, api, setInventoryList }) {

  const handleCancelBtn = () => {
    close();
  }

  const handleDelete = () => {
    console.log(`${api}/inventory/${itemId}`)
    axios.delete(`${api}/inventory/${itemId}`)
      .then(response => {
        console.log(response.data);
        return axios.get(`${api}/inventory`)
      })
      .then(response => {
        console.log(response.data);
        setInventoryList(response.data)
        close();
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (!show) {
    return null
  }

  return (
    <div className="inventory-modal" >
      <div className="inventory-modal__container">
        <div className="inventory-modal__header">
          <img src={closeIcon} alt="X to close" onClick={close} height="35" />
        </div>
        <div className="inventory-modal__text">
          <h1 className="inventory-modal__title">Delete {name} inventory item?</h1>
          <p className="inventory-modal__body">Please confirm that you'd like to delete {name} from the inventory list. </p>
          <p className="inventory-modal__warning">You won't be able to undo this action.</p>
        </div>
        <div className="inventory-modal__buttons">
          <button className="inventory-modal__cancel-btn secondary-btn" onClick={handleCancelBtn}>Cancel</button>
          <button type="button" className="inventory-modal__delete-btn del-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div >
  )
}

export default DeleteInventoryModal;