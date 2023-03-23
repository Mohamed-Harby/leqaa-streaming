import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateRoom />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </>
  );
}

export default App;
