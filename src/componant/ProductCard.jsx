import styles from './ProductCard.module.css';

const ProductCard = ({ product, onClick }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className={styles.productCard} onClick={() => onClick(product)}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
        {product.featured && <span className={styles.featuredBadge}>Featured</span>}
        <span className={styles.discountBadge}>-{discount}%</span>
        <button className={styles.quickView}>Quick View</button>
      </div>
      
      <div className={styles.productInfo}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star ${i < Math.floor(product.rating) ? styles.filled : ''}`}
              ></i>
            ))}
          </div>
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        
        <div className={styles.priceContainer}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
          </div>
          <button className={styles.addToCart}>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;