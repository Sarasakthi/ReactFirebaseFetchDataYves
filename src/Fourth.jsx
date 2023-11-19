import { QueryClient, QueryClientProvider, useQuery } from "react-query";
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

async function getData() {
  return new Promise((resolve, reject) => {
    fetch(goodBadUrl())
      .then((resp) => resolve(resp.json()))
      .catch((e) => reject(e));
  });
}

function ProductListComponent() {
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
        <kbd>{error.message}</kbd>
      </div>
    );

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  document.title = "wednesday: Fourth";
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <section style={styles.text}>
          <p>
            React Query makes the code cleaner and much more robust, it even
            adds retries on failure. We set <kbd>retry: false</kbd> otherwise it
            retries 3 times (default value), and since we use a good url roughly
            50% of the time, it ends up never showing a failure.
          </p>

          <p>
            Note the binding assignment of <kbd>data: prodcuts</kbd> when
            destructuring the result from useQuery.
          </p>
          <p>
            However, if you switch to <kbd>retry: true</kbd>, it allows to
            observe the pending behaviour as well as the retires.
          </p>
        </section>
        <section style={styles.flexed}>
          <h2 style={{ marginBottom: "0" }}>References</h2>
          <cite>
            <a href="https://tanstack.com/query/latest/docs/react/guides/query-retries">
              React Query: query-retries
            </a>
          </cite>
          <cite>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#binding_and_assignment">
              MDN: Destructuring binding and assignment
            </a>
          </cite>
        </section>
        <section style={styles.borded}>
          <ProductListComponent />
        </section>
      </>
    </QueryClientProvider>
  );
}
export default App;
