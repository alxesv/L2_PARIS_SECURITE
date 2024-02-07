import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";

export default function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [result, setResult] = React.useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const result = await response.json();
      setResult(result);
      if (!response.ok) {
        return;
      }
      setName("");
      setPassword("");
      router.push("/");
    } catch (error) {
      setResult(error);
    }
  };
  return (
    <main>
      <h1>Login</h1>
      <section>
        <div>{result.message}</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="login-name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="name">Password</label>
          <br />
          <input
            type="password"
            id="login-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}