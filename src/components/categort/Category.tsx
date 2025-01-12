import { Link } from "react-router-dom";
import { Categoryitem } from "../../lib/helper";
import Title from "../title/Title";
import "./category.css";
function Category() {
  return (
    <div>
      <Title>دسته بندی</Title>
      <div className="category-container">
        {Categoryitem.map((item) => (
          <Link to={`/search/${item.link}`} className="card-container">
            <img src={item.img} alt="" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
