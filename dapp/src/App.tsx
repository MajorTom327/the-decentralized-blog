import { useState } from "react";
import { Layout } from "./components/Layout";
import Card from "./components/Card/Card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Card>
          <h1 className="text-blue-500 text-2xl">Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </Card>
      </Layout>
    </>
  );
}

export default App;
