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
    /*
     * We need to add a return to the function inside the useEffect, to abort the fetch.
     * But then we need to check if the error is an error or an Abort in the catch.
     * Excellent article about this subject + MDN page on AbortController:
     *   https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
     *   https://developer.mozilla.org/en-US/docs/Web/API/AbortController
     */
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(goodBadUrl(), { signal: signal })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setProducts(data);
      })
      .catch((e) => {
        console.log(e);
        if (e.name !== "AbortError") {
          setError(true);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <section style={styles.text}>
        <p>
          We need to add a return to the function inside the useEffect, to abort
          the fetch. But then we need to check if the error is an actual error
          or our Abort. You can try to remove the check for the abort (if
          clause) and observe the abort on of the first call when the second one
          is executed in the browser dev console.
        </p>
        <p>
          Finally this is working correctly, we get either the error or the
          data, but never both anymore, even in dev/strict mode! Check LogRocket
          excellent article about useEffect cleanup function in the references.
        </p>
      </section>

      <section style={styles.flexed}>
        <h2 style={{ marginBottom: "0" }}>References</h2>
        <cite>
          <a href="https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/">
            LogRocket Blog: Understanding React’s useEffect cleanup function
          </a>
        </cite>
        <cite>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/AbortController">
            MDN: AbortController
          </a>
        </cite>
      </section>

      <section style={styles.borded}>
        {error && (
          <div style={styles.error}>
            The fetch did not work, there has been an issue.
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
