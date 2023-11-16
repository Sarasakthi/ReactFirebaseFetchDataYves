import { useQuery } from "react-query";
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

async function getData() {
  return new Promise((resolve, reject) => {
    fetch(goodBadUrl())
      .then((resp) => resolve(resp.json()))
      .catch((e) => reject(e));
  });
}

function App() {
  /*
   * We have to set retry: false otherwise it retries 3 times (default value),
   * and since we use a good url roughly 50% of the time, it ends up never failing.
   * https://tanstack.com/query/latest/docs/react/guides/query-retries
   *
   * However, if you switch to retry: true, it allows to observe the pending
   * behaviour as well as the retires.
   * */
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("products", getData, { retry: false });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error occured:
        <br />
        {error.message}
      </div>
    );

  return (
    <>
      Hello!!
      {
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
      }
    </>
  );
}
export default App;
