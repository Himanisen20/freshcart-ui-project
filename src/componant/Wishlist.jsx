import React, { useEffect } from "react";
import "../css/Wishlist.css"
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ShoppingCart,Trash} from "lucide-react";


const Wishlist = () => {

  const [wishItems, setwishitem] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8080/wishlistdata") // <-- your API
      .then((res) => {
        if (res.data.status) {
          setwishitem(res.data.allproducts); // API should return array

        }

      })
      .catch((err) => {
        console.error("API Error:", err);

      });
  }, []);

  //addtocart......
  const addcart = (cart) => {
    console.log(cart)
    axios.post("http://localhost:8080/addcart", { cart })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: " add to cart!",
            icon: "success",
          });

        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User not found!",
          });

        }
      })
    }

  let removebtn = (data) => {
    console.log(data)
    axios.post("http://localhost:8080/removewish", { data }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Remove it!",
          
          icon: "success"
        });
      }

    })
  }

  return (
    <div className="wishlist-page">

      <header className="wishlist-header">
        <h1>My Wishlist</h1>
      </header>

      <div className="wishlist-container">
        {wishItems.map((item) => (
          <div className="wishlist-item" key={item.id}>

            <img
              src={item.image}
              alt={item.title}
              className="wishlist-image"
            />

            <div className="wishlist-details">
              <h2>{item.title}</h2>
              <p className="price">Price: ${item.price}</p>
              <p className="weight">Weight: {item.weight}</p>
            </div>

           <div className="btn">
             <button className="cart-btn"
              onClick={() => addcart(item)}>
                 <ShoppingCart size={18} /></button>
              
            <button className="remove-btn"
              onClick={() => removebtn(item)}>
                 <Trash size={18} /></button>
           </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Wishlist;
