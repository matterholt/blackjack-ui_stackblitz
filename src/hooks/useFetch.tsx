import * as React from 'react';
import { useState } from 'react';

function useFetch() {
  const [fetchedData, setFetchData] = useState();

  const [status, setStatus] = useState('waiting');
  const [message, setMessage] = useState();

  let options = { deck: 'new', cardCount: 4 };
  const _URL = `https://deckofcardsapi.com/api/deck/${options.deck}/draw/?count=${options.cardCount}`;

  // blackjack settings

  async function sending() {
    try {
      setStatus('loading');
      const response = await fetch(_URL);
      const resData = await response.json();

      if (resData.success) {
        setFetchData(resData);
        setStatus('gameOn');
      } else {
        console.log('error');
        setFetchData(resData.error);
        setStatus('error');
      }
    } catch (error) {
      // need to get a erro boundry
      console.log(error);
      throw new Error(error);
    }
  }


  return { fetchedData, status, sending };
}
export default useFetch;
