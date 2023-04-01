import React , { useEffect }from "react";
import "../styles/product.css";
import { useState } from "react";
import axios from "axios";
import { Navigate , Link} from 'react-router-dom';
import { useTheme } from "./themeContext";
export default function Product({ children }) {
  const[state, setState]=useState(1)
  const [result, setResult] = useState(" ");
  var [up, setUp]=useState([]);
  const [res1, setRes1] = useState();
  const themer = useTheme();
  useEffect(()=>
  {
    getProducts()
  },[state])

  function getProducts() {
    axios.get("http://localhost:6969/api/card", {
        params: {}
    }).then((response) => {
        console.log(response.data);
        setResult(response.data);
    }).catch((error) => {
        console.log(error)
    })
}
const handleCart= (event, objid,objprice,objname,objimage)=>
{
 console.log(objid)
 console.log(objprice)
 console.log(objname)
 console.log(objimage)
  event.preventDefault();

  axios.post('http://localhost:6969/api/cart', {
    productId:objid,
    email:themer.email,
    name:objname,
    price:objprice,
    image:objimage,
}).then((response)=>{
  console.log(response.data);
  setRes1(response.data)
}).catch((err)=>{console.log(err)})
}
  const theme = useTheme();
  if(theme.login===true)
  {
    if(result===" "){
      return(
        <div className='perloader'>
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      )

    }
    else{
  return (
        <div
          className={theme.theme === true ? "product_dark" : "product_white"}
        >
          <div className="product_header">
          <div class="product_grid product_main-content ">
          {
        result.map((obj) => (
            <div class="product_card">
              <div class="product_image">
                <img src={obj.image} alt="tree" />
              </div>
              <div class="product_description">
                    {obj.name}
                <div class="products_description_buttons">
                  <h3>{obj.price}</h3>

                  <button type="button" class="btn btn-primary " onClick={(e)=>handleCart(e, obj._id,obj.price,obj.name,obj.image)}  name="productId">
                  <Link to='/custinfo'><small  >Buy Now</small></Link>
                  </button>
                </div>
              </div>
            </div>
          ))}  
          </div>
          </div>
        </div>
  );
          }
}
if(theme.login===false){
  return(
    <Navigate to="/login" />
  )
}
}
