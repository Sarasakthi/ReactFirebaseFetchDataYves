import { NavLink } from "react-router-dom";

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
  return (
    <>
      <h1>Wednesday</h1>
      <section style={styles.text}>
        <p>
          What started as a simple introduction to JasvaScript asynchronous
          functions in a React class on cold <em>Wednesday</em> night...
        </p>
        <p>
          Pages do not include navigation as they were kept as simple as
          possible and self contained.
        </p>
        <p>
          To play further in your own project:
          <ul>
            <li>
              <kbd>
                npm create vite@latest cool-project-name -- --template react
              </kbd>
            </li>
            <li>
              Replace the current <kbd>App.jsx</kbd> with one of the ordinal jsx
              file (First.jsx, Second.jsx etc...)
            </li>
            <li>
              <kbd>npm install && npm run dev</kbd>
            </li>
            <li>
              For the fourth one: <kbd>npm install react-query</kbd>
            </li>
          </ul>
        </p>
      </section>

      <div style={styles.flexed}>
        <div>
          <NavLink to="/first" target="_blank">
            First
          </NavLink>
          : A simple fetch inside a useEffect, no consideration for failures.
        </div>
        <div>
          <NavLink to="/second" target="_blank">
            Second
          </NavLink>
          : Adding a catch clause and injecting errors. React StrictMode shows
          our useEffect is not pure.
        </div>
        <div>
          <NavLink to="/third" target="_blank">
            Third
          </NavLink>
          : Using useEffect cleanup function to abort the fetch.
        </div>
        <div>
          <NavLink to="/fourth" target="_blank">
            Fourth
          </NavLink>
          : React Query!
        </div>
      </div>
    </>
  );
}
export default App;
