import { useEffect, useState } from "react";
import "./App.css";

const styles = {
  text: {
    textAlign: "left",
  },
  flexed: {
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "flex-start",
  },
  borded: {
    border: "blue solid 2px",
    marginTop: "1rem",
  },
  error: {
    color: "red",
  },
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    )
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <section>
        Simple fetch demonstrating the use a Promises (a fetch) inside a
        useEffect. Errors are not dealt with. No error is injected.
      </section>

      <section style={styles.flexed}>
        <h2 style={{ marginBottom: "0" }}>References</h2>
        <cite>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises">
            MDN: How to use promises
          </a>
        </cite>
        <cite>
          <a href="https://vitejs.dev/guide/">Getting Started (Vite)</a>
        </cite>
        <cite>
          <a href="https://legacy.reactjs.org/docs/dom-elements.html#style">
            React inline style
          </a>
        </cite>
        <cite>
          <a href="https://react.dev/reference/react/useEffect">
            React useEffect
          </a>
        </cite>
      </section>

      <section style={styles.borded}>
        <ul>
          {products.map((product) => (
            <li key={product.name}>{product.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
export default App;
