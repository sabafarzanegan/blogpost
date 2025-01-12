import { Categoryitem, order } from "../../lib/helper";
import SearchInput from "../SearchInput/SearchInput";
import Select from "../select/Select";
import "./Filter.css";

function Filter() {
  return (
    <div style={{ margin: "0px auto", width: "100%" }}>
      <SearchInput />
      <div className="filter-container">
        <Select data={Categoryitem} label="category" />
        <Select data={order} label="order" />
      </div>
    </div>
  );
}

export default Filter;
