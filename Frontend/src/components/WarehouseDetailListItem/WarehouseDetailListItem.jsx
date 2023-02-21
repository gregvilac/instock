import "./WarehouseDetailListItem.scss"
import deleteIcon from "../../assets/icon/delete_outline-24px.svg"
import editIcon from "../../assets/icon/edit-24px.svg"
import chevron from "../../assets/icon/chevron_right-24px.svg"
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";
import { Link } from "react-router-dom";
import { useState } from "react";

const WarehouseDetailListItem = (props) => {

    const [show, setShow] = useState(false);

    return (
        <div className="inventorylist">
            <div className="inventorylist__item--mobile">
                <div className="inventorylist__item--mobile--top">
                    <div className="inventorylist__item--mobile--top--left">
                        <div>
                            <h5 className="inventorylist__item--mobile--label">Inventory Item</h5>
                            <Link className="inventorylist__item--mobile--link" to={`/inventory/${props.id}`}>
                                <p>{props.name}</p>
                                <img src={chevron} alt="." />
                            </Link>
                        </div>
                        <div>
                            <h5 className="inventorylist__item--mobile--label">Category</h5>
                            <p>{props.category}</p>
                        </div>
                    </div>
                    <div className="inventorylist__item--mobile--top--right">
                        <div>
                            <h5 className="inventorylist__item--mobile--label">Status</h5>
                            <div className={props.status === "In Stock" ? `status__tag--instock` : `status__tag--outofstock`}><p>{props.status}</p></div>
                        </div>
                        <div>
                            <h5 className="inventorylist__item--mobile--label">QTY</h5>
                            <p>{props.quantity}</p>
                        </div>
                    </div>
                </div>
                <div className="inventorylist__item--mobile--bottom">
                    <Link to="" onClick={() => setShow(true)}>
                        <img src={deleteIcon} alt="Delete" />
                    </Link>
                    <DeleteInventoryModal itemId={props.id} name={props.name} show={show} close={() => setShow(false)} api={props.api} setInventoryList={props.setInventoryList} />

                    <Link to={`/inventory/${props.id}/edit`}>
                        <img src={editIcon} alt="Edit" />
                    </Link>
                </div>
            </div>
            <div className="inventorylist__item">
                <Link className="inventorylist__item--link" to={`/inventory/${props.id}`}>
                    <p>{props.name}</p>
                    <img src={chevron} alt="." />
                </Link>
                <p>{props.category}</p>
                <div><div className={props.status === "In Stock" ? `status__tag--instock` : `status__tag--outofstock`}><p>{props.status}</p></div></div>
                <p>{props.quantity}</p>
                <div className="inventorylist__item--action">
                    <Link to="" onClick={() => setShow(true)}><img src={deleteIcon} alt="Delete" /></Link>
                    <DeleteInventoryModal itemId={props.id} name={props.name} show={show} close={() => setShow(false)} api={props.api} setInventoryList={props.setInventoryList} />
                    <Link to={`/inventory/${props.id}/edit`}><img src={editIcon} alt="Edit" /></Link>
                </div>
            </div>
        </div>
    )
}

export default WarehouseDetailListItem;