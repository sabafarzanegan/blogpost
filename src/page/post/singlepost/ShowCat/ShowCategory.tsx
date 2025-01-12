import "./showcategory.css";
import front from "/front-end-small.png";
import sience from "/data-science-small.png";
import backend from "/back-end-small.png";
import devops from "/dev-ops-small.png";
import security from "/security-small.png";

function ShowCategory({ category }: { category: string | undefined }) {
  return (
    <div className="color">
      {category == "frontend" && (
        <div className="show-cat-container ">
          <p>
            <img src={front} alt={category} />
          </p>
          <p>فرانت اند</p>
        </div>
      )}
      {category == "datasience" && (
        <div className="show-cat-container">
          <p>
            <img src={sience} alt={category} />
          </p>
          <p>علم داده</p>
        </div>
      )}
      {category == "backend" && (
        <div className="show-cat-container">
          <p>
            <img src={backend} alt={category} />
          </p>
          <p>بک اند</p>
        </div>
      )}
      {category == "devops" && (
        <div className="show-cat-container">
          <p>
            <img src={devops} alt={category} />
          </p>
          <p>دواپس</p>
        </div>
      )}
      {category == "security" && (
        <div className="show-cat-container">
          <p>
            <img src={security} alt={category} />
          </p>
          <p>امنیت</p>
        </div>
      )}
    </div>
  );
}

export default ShowCategory;
