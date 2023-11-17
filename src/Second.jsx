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

function goodBadUrl() {
  const PATH =
    "learning-area/javascript/apis/fetching-data/can-store/products.json";
  const GOOD_HOST = "mdn.github.io";
  const BAD_HOST = "badhost.example.com";
  const random = Math.random() * 2;
  console.log(random);
  const host = random < 1 ? BAD_HOST : GOOD_HOST;

  return `https://${host}/${PATH}`;
}

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(goodBadUrl())
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, []);

  return (
    <>
      <section style={styles.text}>
        <p>
          Catch clause has been added, and an error is injected (a bad URL)
          about 50% of the time.
        </p>
        <p>
          Open the console, keep reloading, and observe that in dev mode the
          useEffect is run twice (&quot;Strict Mode calls some of your functions
          (only the ones that should be pure) twice in development.&quot;). Note
          also that random numbers are displayed in the console twice in a row,
          before the first fetch has time to return or fail, this is because the
          fetch is asynchronous. This leads to situations where both the error
          message and the data are displayed.
        </p>
        <p>
          We use the <kbd>product.name</kbd> for the key here. When possible ask
          for a guaranteed unique identifier to be included in the data.
        </p>
      </section>

      <section style={styles.flexed}>
        <h2 style={{ marginBottom: "0" }}>References</h2>
        <cite>
          <a href="https://react.dev/learn/conditional-rendering">
            React Conditional Rendering
          </a>
        </cite>
        <cite>
          <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises">
            MDN: How to use promises
          </a>
        </cite>
        <cite>
          <a href="https://react.dev/reference/react/StrictMode">
            React StrictMode
          </a>
        </cite>
        <cite>
          <a href="https://react.dev/learn/rendering-lists">
            React Rendering Lists
          </a>
        </cite>
      </section>
      <section style={styles.borded}>
        {error && (
          <div style={styles.error}>
            The fetch did not work, there has been an error.
          </div>
        )}
        <div>
          {products.length === 0 && (
            <div>
              map on an empty array does not error out, it just returns
              nothing...
            </div>
          )}
          <ul>
            {products.map((product) => (
              <li key={product.name}>{product.name}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
export default App;
