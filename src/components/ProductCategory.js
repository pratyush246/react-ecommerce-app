// want to create a ProductCategory component that displays a list of products in a category
import React, { useState, useEffect } from "react";
import Products from "./Products";

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  //create segments for each category which can be expanded or collapsed
  const categories = [...new Set(products.map((product) => product.category))];
  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (category) => {
    //close all other categories when one is expanded
    setExpandedCategories((prev) => ({
      ...Object.fromEntries(
        Object.keys(prev).map((key) => [
          key,
          key === category ? !prev[key] : false,
        ])
      ),
      [category]: !prev[category],
    }));
    //toggle the clicked category
  };

  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold  text-blue-700 mb-4">
        Product Categories
      </h1>
      {categories.map((category) => (
        <div
          key={category}
          className="bg-white shadow-md rounded p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
        >
          <button
            onClick={() => toggleCategory(category)}
            className="text-lg font-semibold text-blue-500 mb-2 flex items-center cursor-pointer"
          >
            <span className="mr-2">{category.toUpperCase()}</span>
            <span className="text-2xl">
              {expandedCategories[category] ? "-" : "+"}
            </span>
          </button>
          {expandedCategories[category] && (
            <Products category={category} products={products} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
