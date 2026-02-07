// src/Data/data.js

// Featured Category cards ke liye data
export const products = [
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    image:
      "https://via.placeholder.com/140x100?text=Cleaning",
  },
  {
    id: "pet-care",
    name: "Pet Care",
    image:
      "https://via.placeholder.com/140x100?text=Pet+Care",
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image:
      "https://via.placeholder.com/140x100?text=Fruits+%26+Veg",
  },
  {
    id: "beverages",
    name: "Beverages",
    image:
      "https://via.placeholder.com/140x100?text=Beverages",
  },
];

// Products – har product ka categoryId upar wali category ke id se match karega
export const  categories = [
  // Cleaning
  {
    id: 1,
    name: "Surf Excel Matic 1kg",
    price: 199,
    categoryId: "cleaning-essentials",
    image:
      "https://via.placeholder.com/300x200?text=Surf+Excel",
  },
  {
    id: 2,
    name: "Harpic Bathroom Cleaner",
    price: 149,
    categoryId: "cleaning-essentials",
    image:
      "https://via.placeholder.com/300x200?text=Harpic",
  },

  // Pet Care
  {
    id: 3,
    name: "Pedigree Adult Dog Food 3kg",
    price: 799,
    categoryId: "pet-care",
    image:
      "https://via.placeholder.com/300x200?text=Pedigree",
  },

  // Fruits & Vegetables
  {
    id: 4,
    name: "Fresh Apple (1kg)",
    price: 120,
    categoryId: "fruits-vegetables",
    image:
      "https://via.placeholder.com/300x200?text=Apple",
  },
  {
    id: 5,
    name: "Tomato (1kg)",
    price: 40,
    categoryId: "fruits-vegetables",
    image:
      "https://via.placeholder.com/300x200?text=Tomato",
  },

  // Beverages
  {
    id: 6,
    name: "Pepsi 1.25L",
    price: 65,
    categoryId: "beverages",
    image:
      "https://via.placeholder.com/300x200?text=Pepsi",
  },
  {
    id: 7,
    name: "Real Fruit Juice 1L",
    price: 110,
    categoryId: "beverages",
    image:
      "https://via.placeholder.com/300x200?text=Real+Juice",
  },
];
