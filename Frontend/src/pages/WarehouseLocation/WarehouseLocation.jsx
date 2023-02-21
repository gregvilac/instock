import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WarehouseLocation.scss";
import WarehouseDetailListItem from "../../components/WarehouseDetailListItem/WarehouseDetailListItem";
import editIcon from "../../assets/icon/edit-24px.svg";
import backArrow from "../../assets/icon/arrow_back-24px.svg";
import { Link } from "react-router-dom";


function WarehouseLocation({ api }) {
  //Set states for Details and Inventory

  const [activeWarehouseDetails, setActiveWarehouseDetails] = useState({});
  const [activeWarehouseInventory, setActiveWarehouseInventory] =
    useState(null);

  //

  const { warehouseID } = useParams();
  const getWarehouseDetails = (id) => {
    axios
      .get(api + "/warehouse/" + id)
      .then((response) => {
        setActiveWarehouseDetails(response.data[0]);
        document.title = "InStock" + response.data[0].warehouse_name + "Warehouse";
      })
      .catch((err) => console.log(err));
  };


  const getWarehouseInventory = (id) => {
    axios
      .get(api + "/warehouse/" + id + "/inventory")
      .then((response) => {
        setActiveWarehouseInventory(response.data);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getWarehouseDetails(warehouseID);
    getWarehouseInventory(warehouseID);
  }, [warehouseID]);



  return (
    <div className="warehouse">

      <div className="product__header">
        <div className="product__header-left">
          <Link to={`/`} className="product__header-left--link">
            <img src={backArrow} alt="back arrow" />
          </Link>


          <h1 className="product__name">{activeWarehouseDetails.warehouse_name}</h1>
        </div>

        <div className="product__header-right">
          <Link to={ "/" + warehouseID + "/edit"}>
            <div className="product__edit-button">
              <img
                src={editIcon}
                alt="edit icon"
                className="product__edit-icon"
              />
              <p className="product__edit-text">Edit</p>
            </div>
          </Link>
        </div>
      </div>

      <ul className="warehouse__location">
        <li className="warehouse__location-address">
          <div className="warehouse__location-address__details">
            <p className="warehouse__location-address__details-title">
              WAREHOUSE ADDRESS:
            </p>
            <p className="warehouse__location-address__details-p">
              {`${activeWarehouseDetails.address}, ${activeWarehouseDetails.city}, ${activeWarehouseDetails.country}`}
            </p>
          </div>
          <div className="warehouse__locations">
            <div className="warehouse__locations-contact">
              <p className="warehouse__locations-contact__title">CONTACT NAME:</p>


              <p className="warehouse__locations-contact__name">
                {`${activeWarehouseDetails.contact_name}`}
              </p>
              <p className="warehouse__locations-contact__position">
                {`${activeWarehouseDetails.contact_position}`}
              </p>
            </div>
            <div className="warehouse__locations-info">
              <p className="warehouse__locations-info__title">
                CONTACT INFORMATION:
              </p>
              <p className="warehouse__locations-info-phone">{`${activeWarehouseDetails.contact_phone}`}</p>
              <p className="warehouse__locations-info-email">{`${activeWarehouseDetails.contact_email}`}</p>
            </div>
          </div>
        </li>
      </ul>
      <div className="warehouse__inventory">
        <div className="warehouse__inventory--title">
          <h5>Inventory Item</h5>
          <h5>Category</h5>
          <h5>Status</h5>
          <h5>QTY</h5>
          <h5>Action</h5>
        </div>
        {activeWarehouseInventory === null || activeWarehouseInventory === []
          ? <div><p>Loading data...</p></div>
          : activeWarehouseInventory.map((item) => { return <WarehouseDetailListItem key={item.id} id={item.id} name={item.item_name} category={item.category} quantity={item.quantity} status={item.status} /> })
        }
        { }
      </div>
    </div>
  );
}


export default WarehouseLocation;