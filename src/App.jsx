import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("useEffect starts");
    fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    )
      .then((response) => response.json())
      .then((data) => setProducts(data));
    console.log("useEffect ended");
  }, []);

  /* Here we create a small React component. For it to be a proper React component, we need:
   *   - it has to be a function
   *   - the function name has to start with an upper case
   *   - it has to return valid JSX, that means no siblings, one element with children, hence
   *     my use of a
   * */
  const ProductList = () => {
    return (
      <>
        {products.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </>
    );
  };

  return (
    <>
      Hello!!
      <div>
        <ul>
          <ProductList />
        </ul>
      </div>
    </>
  );
}
export default App;
