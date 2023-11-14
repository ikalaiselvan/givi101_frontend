import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]:value
    })
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${API_URL}/signin/verify`, formData);
      
      if(response.data === true){
        alert("Registration link sent to your email id ...");
      }else if(response.data === false){
        alert("User aldready exist");
      }
    }catch(e){
      console.log(e);
    }
  }

  return (
    <Container>
      <h1>Register Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
          Register
        </Button>
        <p>
          If aldready have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
}
