// pages/Register/index.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/v1/users/register", {
        username,
        fullname,
        email,
        password,
      });
      alert("Registered successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold text-center">Register</h2>

      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        placeholder="Full Name"
        type="text"
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;
