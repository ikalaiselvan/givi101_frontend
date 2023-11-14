import { Button, Container } from 'react-bootstrap';
import "../styles/Home.css";
import axios from "axios";
import API_URL from "../../config/global";
import { useEffect, useState } from 'react';

export default function Home() {
  const [res, setRes] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      getData(user.token);
    }
  }, []);

  const getData = async (token) => {
    try{
      const config = {
        headers: {
          Authorization : token
        }
      }

      const response = await axios.get(`${API_URL}/home`, config);
      console.log(typeof(response.status));

      try {
        if (response.data === "Invalid Token") {
          alert("login again");
        } else if (response.data === "Server Busy") {
          alert("unauthorized access");
        } else if (response?.status) {
          setRes(response.data);
        }
      } catch (e) {
        console.log(e);
      }

    }catch(e){
      console.log(e);
    }
  }

  return (
    <Container>
      <h1>This is our website</h1>
      {console.log(res)}
      <p>{res.id}</p>
      <p>we are have to seve you...</p>
      <p>{res.name}</p>
      <Button variant="primary" type="submit">
        Get started
      </Button>
    </Container>
  );
}
