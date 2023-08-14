import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useState, useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

// DO THIS ON THE BACKEND
const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmin } = useContext(AuthContext) as AuthContextType;

  const loginAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email !== ADMIN_EMAIL) {
      alert("Wrong email!");
      return;
    }

    if (password !== ADMIN_PASSWORD) {
      alert("Wrong password!");
      return;
    }

    setAdmin({
      email,
      password,
    });
    localStorage.setItem("admin", JSON.stringify({ email, password }));
  };

  return (
    <Form onSubmit={loginAdmin}>
      <Row
        style={{
          height: "80vh",
          justifyContent: "center",
          paddingTop: "3%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            <Form.Control
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Form.Control
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="primary" type="submit">
              {false ? "Loading..." : "Login"}
            </Button>

            {/* {loginError?.error && (
                        <Alert variant="danger"><p>{loginError?.message}</p></Alert>
                    )} */}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default AdminLogin;
