import * as React from 'react';
import DealtHand from './components/dealt_hand/DealtHand';
import TableLayout from './components/table_layout/TableLayout';
import useFetch from './hooks/useFetch';

import { createContext, useContext } from 'react';

import data from './temp.json';

const GameStateContext = createContext(null);

export default function App() {
  const dealers_hande = [data?.cards[0], data?.cards[0]];
  const player_hande = [data?.cards[1], data?.cards[1]];

  const [gamesStatus, updateGameStatus] = React.useState('playing');

  // GLOBAL : number players, name of the game, deck id,
  return (
    <GameStateContext.Provider value={{ gamesStatus, updateGameStatus }}>
      <div>
        <DealtHand dealtCards={dealers_hande} handType="dealer" />
        <DealtHand dealtCards={player_hande} />
      </div>
    </GameStateContext.Provider>
  );
}
