import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const currencyNames = {
    "USD": "United States Dollar",
    "INR": "Indian Rupee",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan",
    "SEK": "Swedish Krona",
    "NZD": "New Zealand Dollar",
    "MXN": "Mexican Peso",
    "SGD": "Singapore Dollar",
    "HKD": "Hong Kong Dollar",
    "NOK": "Norwegian Krone",
    "KRW": "South Korean Won",
    "TRY": "Turkish Lira",
    "RUB": "Russian Ruble",
    "ZAR": "South African Rand",
    "BRL": "Brazilian Real",
    "PLN": "Polish Zloty",
    "THB": "Thai Baht",
    "IDR": "Indonesian Rupiah",
    "HUF": "Hungarian Forint",
    "CZK": "Czech Koruna",
    "ILS": "Israeli Shekel",
    "CLP": "Chilean Peso",
    "PHP": "Philippine Peso",
    "AED": "United Arab Emirates Dirham",
    "COP": "Colombian Peso",
    "SAR": "Saudi Riyal",
    "MYR": "Malaysian Ringgit",
    "RON": "Romanian Leu",
    "DKK": "Danish Krone"
  };

  const currencyCodes = Object.keys(currencyNames);

  const getExchangeRate = async () => {
    if (!fromCurrency || !toCurrency || amount === '' || isNaN(amount) || amount <= 0) return;

    try {
      const url = `https://v6.exchangerate-api.com/v6/0af66442d09e1d0bb26f7181/latest/${fromCurrency}`;
      const response = await axios.get(url);
      const rate = response.data.conversion_rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error("Error fetching exchange rate", error);
    }
  };

  useEffect(() => {
    if (exchangeRate !== null && amount !== '') {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [exchangeRate, amount]);

  const handleConvert = () => {
    getExchangeRate();
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className='currency-converter'>
        <div className='curr-data'>
          <h1>CURRENCY CONVERTER</h1>

          <div className='image'></div>

          <div className='inputcontainer'>
            <label>Amount:</label>
            <input
              type='number'
              value={amount}
              onChange={handleAmountChange}
              min="0"
              placeholder="Enter the amount"
            />
          </div>

          <div className='inputcontainer'>
            <label>From Currency:</label>
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="">-- Select Currency --</option>
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code} - {currencyNames[code] || "Unknown Currency"}
                </option>
              ))}
            </select>
          </div>

          <div className='inputcontainer'>
            <label>To Currency:</label>
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="">-- Select Currency --</option>
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code} - {currencyNames[code] || "Unknown Currency"}
                </option>
              ))}
            </select>
          </div>

          <div className='inputcontainer'>
            <button onClick={handleConvert}>Convert</button>
          </div>

          <div className='res'>
            {convertedAmount !== null && (
              <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
