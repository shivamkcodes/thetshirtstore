import React, { useEffect, useState } from "react";
import "../styles.css";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { cartEnter, getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(true);
      } else {
        setProducts(data);
        // console.log(products);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
    cartEnter();
  }, []);

  // console.log('api is',API);
  return (
    <Base title="My T-Shirt Store" description="Welcome to the my Tshirt store">
      <div className="row text-center">
        {/* <h1 className="text-white text-center">All of Tshirts</h1> */}
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-md-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
