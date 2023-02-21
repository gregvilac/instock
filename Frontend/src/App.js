import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import WarehouseAdd from "./pages/WarehouseAdd/WarehouseAdd";
import InventoryAdd from "./pages/InventoryAdd/InventoryAdd";
import InventoryDescription from "./pages/InventoryDescription/InventoryDescription";
import WarehouseInventory from "./pages/WarehouseInventory/WarehouseInventory";
import WarehouseLocation from "./pages/WarehouseLocation/WarehouseLocation";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import "./App.scss";

function App() {
  const API_URL = process.env.REACT_APP_SERVER_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="App__torso">
          <div className="App__component-container">
            {
              <Routes>
                <Route path="/" element={<Warehouses api={API_URL} />} />
                <Route
                  path="/add-warehouse"
                  element={<WarehouseAdd api={API_URL} />}
                />
                <Route
                  path="/:warehouseID"
                  element={<WarehouseLocation api={API_URL} />}
                />
                <Route
                  path="/:warehouseLocation/edit"
                  element={<WarehouseEdit api={API_URL} />}
                />
                <Route
                  path="/inventory"
                  element={<WarehouseInventory api={API_URL} />}
                />
                <Route path="/inventory/add-item" element={<InventoryAdd />} />
                <Route
                  path="/inventory/:product"
                  element={<InventoryDescription api={API_URL} />}
                />
                <Route
                  path="/inventory/:product/edit"
                  element={<InventoryEdit api={API_URL} />}
                />
              </Routes>
            }
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
