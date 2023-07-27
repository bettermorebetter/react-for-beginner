import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [mymoney, setMyMoney] = useState(0);
  const [standardcoin, setStandardCoin] = useState("Dollars");
  const [standardcoinprice, setStandardCoinPrice] = useState(1);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    const data = JSON.parse(event.target.value);
    setStandardCoin(data.name);
    setStandardCoinPrice(data.quotes.USD.price);
    console.log(standardcoin, standardcoinprice);
  };

  const onChangeMoney = (event) => {
    console.log(typeof event.target.value);
    setMyMoney(event.target.value);
  };

  return (
    <div>
      <h1>Coin Calculator {loading ? "" : `(${coins.length})`}</h1>
      <form>
        <label htmlFor="mymoney">Input dollars you have </label>
        <input
          onChange={onChangeMoney}
          value={mymoney}
          id="mymoney"
          type="number"
        ></input>
      </form>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange} defaultValue={"Select an option"}>
          {coins.map((coin) => (
            <option key={coin.id} value={JSON.stringify(coin)}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <p>
        You have {Number(mymoney) / standardcoinprice} {standardcoin}.
      </p>
    </div>
  );
}

export default App;
