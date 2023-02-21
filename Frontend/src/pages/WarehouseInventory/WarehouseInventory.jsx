import "./WarehouseInventory.scss";
import InventoryListItem from "../../components/InventoryListItem/InventoryListItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sort from "../../assets/icon/sort-24px.svg";

const WarehouseInventory = ({ api }) => {
  const [inventoryList, setInventoryList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get(api + "/inventory")
      .then((response) => {
        setInventoryList(response.data);
        document.title = "InStock Inventories";
      })
      .catch((err) => console.log(err));
  }, [api]);

  useEffect(() => {
    axios
      .get(api + "/warehouse")
      .then((response) => {
        setWarehouseList(response.data);
      })
      .catch((err) => console.log(err));
  }, [api]);

function handleSearch(e) {
  setSearchFilter(e.target.value)
  }

function checkSearch(item) {
  let warehouse = warehouseList.find((e) => e.id === item.warehouse_id)
  return item.item_name.toLowerCase().includes(searchFilter.toLowerCase()) || item.category.toLowerCase().includes(searchFilter.toLowerCase()) || warehouse.warehouse_name.toLowerCase().includes(searchFilter.toLowerCase())
}

  return (
    <div className="inventory">
      <div className="topbar">
        <h1 className="topbar--text">Inventory</h1>
        <input placeholder="Search..." onChange={handleSearch} className="topbar--search" type="text" />
        <Link to="/inventory/add-item">
          <div className="topbar--button">+ Add New Item</div>
        </Link>
      </div>
      <div className="inventory--title">
        <div className="inventory--title-wrapper"><h5>Inventory Item</h5><img className="inventory--title-arrow" src={sort} alt="sorting arrows" /></div>
        <div className="inventory--title-wrapper"><h5>Category</h5><img className="inventory--title-arrow" src={sort} alt="sorting arrows" /></div>
        <div className="inventory--title-wrapper"><h5>Status</h5><img className="inventory--title-arrow" src={sort} alt="sorting arrows" /></div>
        <div className="inventory--title-wrapper"><h5>QTY</h5><img className="inventory--title-arrow" src={sort} alt="sorting arrows" /></div>
        <div className="inventory--title-wrapper"><h5>Warehouse</h5><img className="inventory--title-arrow" src={sort} alt="sorting arrows" /></div>
        <h5>Action</h5>
      </div>
      {inventoryList.filter(checkSearch).map((item) => {
        let warehouse = warehouseList.find((e) => e.id === item.warehouse_id);
        return (
          <InventoryListItem
            key={item.id}
            id={item.id}
            name={item.item_name}
            category={item.category}
            quantity={item.quantity}
            status={item.status}
            warehouse={warehouse ? warehouse.warehouse_name : undefined}
            api={api}
            setInventoryList={setInventoryList}
          />
        );
      })}
    </div>
  );
};

export default WarehouseInventory;
