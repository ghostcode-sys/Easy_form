// import logo from './logo.svg';
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Form from "./components/Form";
import Home from "./components/Home";
import FormResult from "./components/FormResult";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
function App() {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100  min-h-screen">
      <div className=" flex justify-start items-center flex-col w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgetPassword/>}/>
          <Route path="/form" element={<Form />} />
          <Route path="/formResult/:id" element={<FormResult />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
