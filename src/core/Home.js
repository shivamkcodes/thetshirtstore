import React, { useEffect, useState } from "react";
import "../styles.css";

import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { cartEnter, getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      setLoading(true);
      if (data.error) {
        console.log(data.error);
        setLoading(false);

        setError(true);
      } else {
        setProducts(data);
        setLoading(false);

        // console.log(products);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
    cartEnter();
  }, []);

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>
            Working on it...
            <div class="spinner-border" role="status">
              <span class="visually-hidden"></span>
            </div>
          </h2>
        </div>
      )
    );
  };

  // console.log('api is',API);
  return (
    <Base title="My T-Shirt Store" description="Welcome to the my Tshirt store">
      <div className="row text-center">
        {/* <h1 className="text-white text-center">All of Tshirts</h1> */}
        <div className="row">
          {loadingMessage()}

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
