import "./InventoryDescription.scss";
import backArrow from "../../assets/icon/arrow_back-24px.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import editIcon from "../../assets/icon/edit-24px.svg";


const InventoryDescription = ({ api }) => {
  const navigate = useNavigate()
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeWarehouse, setActiveWarehouse] = useState(null);

  const { product } = useParams();

  const getWarehouse = useCallback(
    (warehouseID) => {
      axios
        .get(api + "/warehouse/" + warehouseID)
        .then((response) => {
          setActiveWarehouse(response.data[0]);
        })
        .catch((err) => console.log(err));
    },
    [api]
  );

  const getProduct = useCallback(
    (id) => {
      axios
        .get(api + "/inventory/" + id)
        .then((response) => {
          setActiveProduct(response.data[0]);
          document.title = "InStock " + response.data[0].item_name;
          getWarehouse(response.data[0].warehouse_id);
        })

        .catch((err) => console.log(err));
    },
    [api, getWarehouse]
  );

  // const activeWarehouse = warehouseList.find(
  //   (e) => e.id === activeProduct.warehouse_id
  // );

  // console.log(activeWarehouse.warehouse_name);

  useEffect(() => {
    getProduct(product);
  }, [product, getProduct]);

  return (
    activeProduct &&
    activeWarehouse && (
      <div className="product">
        <div className="product__header">
          <div className="product__header-left">
            <img className="product__back-arrow" src={backArrow} alt="back arrow" onClick={() => {navigate('/inventory')}} />

            <h1 className="product__name">{activeProduct.item_name}</h1>
          </div>

          <div className="product__header-right">
            <Link to={"/inventory/" + product + "/edit"}>
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
        <div className="product__details">
          <div className="product__details-inner product__details-inner--border">
            <div className="product__innertext-div">
              <h3 className="product__label">Item Description:</h3>
              <p className="product__body-text">{activeProduct.description}</p>
            </div>
            <div className="product__innertext-div">
              <h3 className="product__label">Category</h3>
              <p className="product__body-text">{activeProduct.category}</p>
            </div>
          </div>
          <div className="product__details-inner">
            <div className="product__availability">
              <div className="product__innertext-availability">
                <h3 className="product__label">Status</h3>
                <div
                  className={
                    activeProduct.status === "In Stock"
                      ? `status__tag--instock`
                      : `status__tag--outofstock`
                  }
                >
                  <p>{activeProduct.status}</p>
                </div>
              </div>
              <div className="product__innertext-availability">
                <h3 className="product__label">Quantity</h3>
                <p className="product__body-text">{activeProduct.quantity}</p>
              </div>
            </div>
            <div className="product__innertext-div">
              <h3 className="product__label">Warehouse</h3>
              <p className="product__body-text">
                {activeWarehouse.warehouse_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default InventoryDescription;
