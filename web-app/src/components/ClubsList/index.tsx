import * as React from "react";

export default function ClubsList() {
  return (
    <>
      <p>
        Тут вы можете просмотреть актуальный список клубов. Нажав на один из
        этих клубов, вы можете подать заявку на вступление в клуб. Слева указана
        стоимость одной фишки в данном клубе
      </p>
      <div className="buttons">
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
        <button className="button club">
          <span>R.C.Manila id:3062618</span> <span>0.9 PHP</span>
        </button>
      </div>
    </>
  );
}
