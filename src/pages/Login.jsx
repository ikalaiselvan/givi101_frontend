import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} =e.target;
    setFormData({
      ...formData, [name] : value,
    })
    console.log(formData)
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    

      const response = await axios.post(`${API_URL}/login`, formData);
      
if(response.data === "Invalid User name and Password"){
  alert("Invalid User name and Password");
}else if(response?.status){
  localStorage.setItem("userInfo",JSON.stringify(response.data));
  navigate("/home");
}

  }
    

  return (
    <Container>
      <h1>Login Form</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          If aldready not have an account? <Link to="/">Register</Link>
        </p>
      </Form>
    </Container>
  );
}
