import './App.css';
import { Main } from './views/Main';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Main />
      </ChakraProvider>
    </div>
  );
}

export default App;
