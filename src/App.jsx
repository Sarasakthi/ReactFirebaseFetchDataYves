import { useEffect, useState } from "react";
import "./App.css";

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
      Hello!!
      {error && (
        <div className="error">
          The fetch did not work, there has been an issue.
          <br />
          This message is brought to you through inline conditional rendering,
          this is one way of doing it, but there are many more, check
          <a href="https://legacy.reactjs.org/docs/conditional-rendering.html">
            https://legacy.reactjs.org/docs/conditional-rendering.html
          </a>{" "}
          to review the other ones.
        </div>
      )}
      <div>
        {products.length === 0 && (
          <div>
            map on an empty array does not error out, it just returns nothing...
          </div>
        )}
        <ul>
          {products.map((product) => (
            <li key={product.name}>{product.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
