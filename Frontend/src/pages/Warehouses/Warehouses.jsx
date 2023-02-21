import "./Warehouses.scss";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import { useState, useEffect } from "react";
import axios from "axios";
import sort from "../../assets/icon/sort-24px.svg";
import { Link } from "react-router-dom";

const Warehouses = ({ api }) => {
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('')

  function handleDeleteRequest(warehouseId) {
    console.log(warehouseId);
    axios.delete(`${api}/warehouse/${warehouseId}`).then(() => {
      setWarehouseList(
        warehouseList.filter((warehouse) => {
          return warehouse.id !== warehouseId;
        })
      );
    });
  }

  useEffect(() => {
    axios
      .get(api + "/warehouse")
      .then((response) => {
        setWarehouseList(response.data);
        document.title = "InStock Warehouses";
      })
      .catch((err) => console.log(err));
  }, [api]);

  function handleSearch(e) {
setSearchFilter(e.target.value)
  }

  return (
    <div className="Warehouses">
      <div className="Warehouses__header-container">
        <p className="Warehouses__header-title">Warehouses</p>
        <div className="Warehouses__actions-container">
          <input
            className="Warehouses__search"
            type="text"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={handleSearch}
          />
          <Link className="Warehouses__button" to="/add-warehouse">
            <div>+ Add New Warehouse</div>
          </Link>
        </div>
      </div>
      <div className="sort">
        <div className="sort__warehouse-container">
          <div className="sort__warehouse">WAREHOUSE</div>
          <img className="sort__img" src={sort} alt="sorting arrows" />
        </div>
        <div className="sort__address-container">
          <div className="sort__address">ADDRESS</div>
          <img className="sort__img" src={sort} alt="sorting arrows" />
        </div>
        <div className="sort__name-container">
          <div className="sort__name">CONTACT NAME</div>
          <img className="sort__img" src={sort} alt="sorting arrows" />
        </div>
        <div className="sort__info-container">
          <div className="sort__info">CONTACT INFORMATION</div>
          <img className="sort__img" src={sort} alt="sorting arrows" />
        </div>
        <div className="sort__actions-container">
          <div className="sort__actions">ACTIONS</div>
        </div>
      </div>

      {warehouseList.length > 0 && (
        <WarehouseList
        searchFilter = {searchFilter}
          warehouses={warehouseList}
          deleteRequest={handleDeleteRequest}
          setWarehouseList={setWarehouseList}
          api={api}
        />
      )}
    </div>
  );
};

export default Warehouses;
