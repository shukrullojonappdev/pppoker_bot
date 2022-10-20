import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <>
      <div className="buttons">
        <Link to="/balance">
          <button className="button">🔺Купить фишки</button>
        </Link>
        <Link to="/balance">
          <button className="button">🔻Вывести фишки</button>
        </Link>
        <Link to="/balance">
          <button className="button">🔗Перевести фишки</button>
        </Link>
        <Link to="/balance">
          <button className="button">💰Мой баланс</button>
        </Link>
        <Link to="/about">
          <button className="button">♠Список клубов</button>
        </Link>
        <Link to="/users">
          <button className="button">💲Хочу стать агентом</button>
        </Link>
      </div>
    </>
  );
}

function Balance() {
  return <h2>balance</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
