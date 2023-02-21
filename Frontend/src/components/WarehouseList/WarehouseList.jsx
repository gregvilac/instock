import './WarehouseList.scss';
import WarehouseListItem from '../WarehouseListItem/WarehouseListItem';

function WarehouseList({warehouses, deleteRequest, api, searchFilter, setWarehouseList}) {

    function checkSearch(warehouse) {
        return warehouse.warehouse_name.toLowerCase().includes(searchFilter.toLowerCase()) || warehouse.contact_name.toLowerCase().includes(searchFilter.toLowerCase()) || warehouse.address.toLowerCase().includes(searchFilter.toLowerCase())
    }
    return (
        <ul className='Warehouse-ul'>
        {warehouses.filter(checkSearch)
        .map((warehouse) => (
            <WarehouseListItem 
            key={warehouse.id}
            id={warehouse.id}
            warehouseName={warehouse.warehouse_name}
            address={warehouse.address}
            city={warehouse.city}
            country={warehouse.country}
            contactName={warehouse.contact_name}
            contactPosition={warehouse.contact_position}
            contactPhone={warehouse.contact_phone}
            contactEmail={warehouse.contact_email}
            deleteRequest={deleteRequest}
            api={api} 
            setWarehouseList={setWarehouseList}/>
        ))}
        </ul>
)};

export default WarehouseList;