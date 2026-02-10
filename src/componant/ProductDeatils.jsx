import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/productdeatil.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Heart} from "lucide-react";
import Header from "./Header";


const ProductDetails = () => {
  const { state } = useLocation();
  const[review,setReview]=useState({});
  const[showreview,setshowreview]=useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const product = state?.product;
  const allProducts = state?.allProducts || [];

  let inputvalue=(e)=>{
    setReview({...review,[e.target.name]:e.target.value})
  }
  console.log(review);

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Product data not found</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  // ✅ Similar products logic
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

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

  const wishlist = (wish) => {
    console.log(wish)
    axios.post("http://localhost:8080/wishlist", { wish })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "add to wishlist!",
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

  const handleIncrement = (id) => {
    //yaha quantity ++ ka logic lagana (API call / context update)
    console.log("Increase quantity for product id:", id);
  };

  const handleDecrement = (id) => {
    //  yaha quantity -- ka logic lagana
    console.log("Decrease quantity for product id:", id);
  };

  //review API
  const reviewbtn=(e)=>{
    e.preventDefault();
       axios.post("http://localhost:8080/Review", {review,productId: product._id,})
       .then((res) => {
               if (res.data.status) {
                 Swal.fire({
                   title: "add review successfull!",
                   icon: "success"
                 });
               }
             }).catch(() => {
               Swal.fire({
                 icon: "error",
                 title: "Oops...",
                 text: "Something went wrong!",
       
               });
             })
  }

  //get review 
useEffect(() => {
    axios.get("http://localhost:8080/getreview") // <-- your API
      .then((res) => {
        if (res.data.status) {
          setshowreview(res.data.allreview); // API should return array
          setLoading(false);
        }

      })
      .catch((err) => {
        console.error("API Error:", err); s
        setLoading(false);
      });
  }, []);
  console.log(showreview)
  

 // ✅ review page
 const customerReview = showreview.filter(
  (r) => r.productId === product._id
);

 return (
    <>
      <Header />
      <div className="product-detail">

        {/* ===== Product Main ===== */}
        <div className="detail-container detail">
          <div className="detail-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="detail-info">
            <p className="detail-category">{product.category}</p>
            <h1>{product.title}</h1>
            <h2 className="detail-price">₹{product.price}</h2>

            {product.weight && (
              <p className="detail-weight">{product.weight}</p>
            )}
            <div className="cart-quntity">
              <button
                className="cart-qty-btn"
                onClick={() => handleDecrement()}
              >
                −
              </button>
              <span className="cart-qty-value">1</span>
              <button
                className="cart-qty-btn"
                onClick={() => handleIncrement()}
              >
                +
              </button>
            </div>
            <p className="detail-discription">{product.discription}</p>


            <button className="detail-add-btn"
              onClick={() => addcart(product)}>Add to Cart</button>

            <div className="icon-box" style={{ padding: 10 }}>
              <Heart size={18} onClick={() => wishlist(product)}/>
             
            </div>
          </div>
 </div>

 {/* review section */}
  <div className="review">
            <div className="reviewform">
              <h2>Write a Review</h2>

              <form>
                <label>Customer Name</label>
                <input type="text" placeholder="Enter your name"
                 name="reviewname"
                 onChange={inputvalue} required />
                 
                  <label>Customer City</label>
                <input type="text" placeholder="Enter your city"
                 name="reviewcity"
                 onChange={inputvalue} required />

                <label>Your Review</label>
                <textarea placeholder="Write your review..."
                 name="reviewmsg"
                 onChange={inputvalue} required></textarea>

                <button type="button"
                onClick={reviewbtn}>Submit Review</button>
              </form>
            </div>

            <div className="reviews-list">
              <h2>Customer Reviews</h2>
{customerReview.map((review, index) => (
  <div className="review-card" key={index}>
    <h4>{review.reviewname}</h4>
    <h5>{review.reviewDate}</h5>
    <h5>{review.reviewcity}</h5>
    <p>{review.reviewmsg}</p>
  </div>
))}
              
            </div>



          </div>

        {/* ===== Similar Products ===== */}
        {similarProducts.length > 0 && (
          <div className="similar-section">
            <h2>Similar Products</h2>

            <div className="similar-grid">

              {
                similarProducts.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="similar-card"
                    onClick={() =>
                      navigate("/productdeatil", {
                        state: {
                          product: item,
                          allProducts,
                        },
                      })
                    }
                  >
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                    <p>₹{item.price}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
