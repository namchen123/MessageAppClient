import ListUser from "./ListUser"
import SearchBar from "./SearchBar"

function SideBar() {
    return (
        <div className="col-3 h-100">
            <SearchBar />
            <ListUser />
        </div>
    )
}

export default SideBar
