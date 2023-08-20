import { useEffect, useState } from 'react';
import './App.css';

// const transurl = process.env.REACT_APP_API;


function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  const effect = () => {
    getTransactions().then(setTransactions);
  };

  const deps = []
  useEffect(effect, deps);

  async function getTransactions() {
    const transURL = "http://localhost:4040/api" + "/transactions";
    const response = await fetch(transURL);
    return await response.json();
  }

  function addValue(x) {
    x.preventDefault();
    const url = "http://localhost:4040/api" + "/transaction";
    console.log(url);

    const value = { price, name, description, date };
    const init = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(value)
    };
    fetch(url, init).
      then(res => {
        res.json().then(json => {

          setName('');
          setPrice('');
          setDescription('');
          setDate('');

          console.log('result', json);
        });
      });
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }

  return (
    <main>
      <div className='mainsec'>
      <div className='app-name'><h1>Coin Rhythm</h1></div>
        <h1>Rs {balance}<span>.00</span></h1>
        <form onSubmit={addValue}>
          <div className='basic'>

            <input type="text"
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              placeholder='Amount' />

            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder='Title' />

            <input type="date"
              value={date}
              onChange={ev => setDate(ev.target.value)} />

          </div>
          <div className='description'>

            <input type="text"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder='Description' />

          </div>
          <button type='submit'>Add transaction</button>

        </form>

        <div className='transactions'>
          {transactions.length > 0 && transactions.map(transaction => (
            <div className='transaction'>
              <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='descrip'>{transaction.description}</div>
              </div>
              <div className='right'>
                <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>{transaction.price}</div>
                <div className='date'>{transaction.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
