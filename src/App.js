import "./App.css";

import Container from "react-bootstrap/Container";
import ParentComponent from "./components/ParentComponent";

// or less ideally
function App() {
  return (
    <div className="App">
      <Container>
          <ParentComponent />
      </Container>
    </div>
  );
}

export default App;
