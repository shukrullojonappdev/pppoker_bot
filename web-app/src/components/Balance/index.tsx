import * as React from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";

let myWindow = window as any;
let tg = myWindow.Telegram.WebApp;

export default function Balance() {
  tg.BackButton.show();
  return (
    <>
      <Outlet />
    </>
  );
}

function IndexBalance() {
  const navigate = useNavigate();
  tg.BackButton.onClick(async () => await navigate("/"));
  return (
    <>
      <p>На вашем счету: 40 USDT</p>
      <p>Количество фишек:</p>
      <p>Клуб 1 - 3600</p>
      <p>Клуб 2 - 0</p>
      <p>Клуб 3 - 0</p>
      <div className="buttons">
        <Link to="refill">
          <button className="button">💸Пополнить баланс!</button>
        </Link>
        <Link to="withdraw">
          <button className="button">💸Вывести USDT</button>
        </Link>
      </div>
    </>
  );
}

function EmptyBalance() {
  return (
    <>
      <p>❌На вашем балансе нет средств!</p>
      <p> Пополните баланс бота, перейдя по кнопке</p>
      <p>"💰Мой баланс"</p>
    </>
  );
}

function RefillBalance() {
  const navigate = useNavigate();
  tg.BackButton.onClick(async () => await navigate("/balance"));
  return (
    <>
      <p>
        Для того, чтобы пополнить баланс - перейдите по этой{" "}
        <a href="https://t.me/usdtex_bot">ссылке</a>.
      </p>
      <p>
        Далее приобретите желаемое количество USDT. После того, как вы пополните
        ваш кошелек в боте, после этого нажмите "Перевод USDT" и переведите по
        следующим реквизитам желаемое количество средств: 89-2354-563
      </p>
      <p>
        После того, как вы пополните баланс - бот определит пополнение счета и
        вы получите уведомление о том, что средства поступили на ваш счет.
      </p>
    </>
  );
}

function WithdrawUSDT() {
  const navigate = useNavigate();
  tg.BackButton.onClick(async () => await navigate("/balance"));
  return (
    <>
      <p> sdfgdsfhfh</p>
    </>
  );
}

export { IndexBalance, RefillBalance, WithdrawUSDT, EmptyBalance };
