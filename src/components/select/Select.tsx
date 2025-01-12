import { Poststore } from "../../store/Poststore";
import "./select.css";
interface props {
  data: { name: string; link: string; img?: string | undefined }[];
  label: string;
}

function Select({ data, label }: props) {
  const { setSelectedCategory, setOrder, selectedCategory, selectedOrder } =
    Poststore((state) => state);
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (label === "category") {
      setSelectedCategory(e.target.value || undefined);
    }
    if (label === "order") {
      setOrder(e.target.value || undefined);
    }
  };
  console.log(selectedCategory, selectedOrder);

  return (
    <div className="cat-container">
      <label htmlFor="category">
        {label == "category" ? "دسته بندی" : "مرتب سازی"}
      </label>
      <select
        onChange={changeHandler}
        id="category"
        className="select-container">
        <option value="" disabled selected>
          انتخاب کنید
        </option>
        {data.map((item) => (
          <option className="select-option" value={item.link}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
