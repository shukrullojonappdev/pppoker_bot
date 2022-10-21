import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import Balance, {
  IndexBalance,
  RefillBalance,
  WithdrawUSDT,
} from "./components/Balance";
import BuyChips from "./components/BuyChips";
import ClubsList from "./components/ClubsList";
import WithdrawChips from "./components/WithdrawChips";

let myWindow = window as any;
let tg = myWindow.Telegram.WebApp;

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyChips" element={<BuyChips />} />
        <Route path="/withdrawChips" element={<WithdrawChips />} />
        <Route path="/balance" element={<Balance />}>
          <Route index element={<IndexBalance />} />
          <Route path="refill" element={<RefillBalance />} />
          <Route path="withdraw" element={<WithdrawUSDT />} />
        </Route>
        <Route path="/clubsList" element={<ClubsList />} />
      </Routes>
    </>
  );
}

function Home() {
  tg.BackButton.hide();
  return (
    <>
      <div className="buttons">
        <Link to="/buyChips">
          <button className="button">🔺Купить фишки</button>
        </Link>
        <Link to="/withdrawChips">
          <button className="button">🔻Вывести фишки</button>
        </Link>
        <Link to="/balance">
          <button className="button">🔗Перевести фишки</button>
        </Link>
        <Link to="/balance">
          <button className="button">💰Мой баланс</button>
        </Link>
        <Link to="/clubsList">
          <button className="button">♠Список клубов</button>
        </Link>
        <Link to="/users">
          <button className="button">💲Хочу стать агентом</button>
        </Link>
      </div>
    </>
  );
}

function Users() {
  return <h2>Users</h2>;
}
