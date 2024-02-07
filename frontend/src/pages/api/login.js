import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    if (!response.ok)
      return res.status(401).json({ message: response.statusText });
    setCookie("user", JSON.stringify(result.user), {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
}