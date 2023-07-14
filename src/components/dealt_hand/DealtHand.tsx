import * as React from 'react';
import style from './dealt_hand.module.css';
import { useContext } from 'react';

interface DealtCard {
  code: string;
  suit: string;
  value: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
}

const CardTitle = (suit, value) => (
  <h3>
    {suit} <br /> of {value}
  </h3>
);

const cardLayout = {
  aspectRatio: '3/4',
  width: '100px',
  position: "'absolute",
};

const Card = ({ card, index, hiddenCard }) => {
  const { code, image, suit, value } = card;

  if (hiddenCard && index === 0) {
    return (
      <div style={{ ...cardLayout, zIndex: -2 }}>
        <img src="https://www.deckofcardsapi.com/static/img/back.png" />
      </div>
    );
  }

  return (
    <div style={cardLayout}>
      <img src={image} />
    </div>
  );
};

const UserControl = ({
  cardvalues,
  ohHold,
  ohHit,
  onReset,
}: {
  cardvalues: number;
  ohHold: () => void;
  ohHit: () => void;
  onReset: () => void;
}) => {
  // const [statusOfHand, setStatusOfHand] = React.useState("active")
  const statusOfHand = cardvalues > 21 ? 'bustted' : 'gameOn';

  if (statusOfHand === 'bustted') {
    return (
      <div>
        BUSTED!! YOU LOSE YOUR MONEY <button onClick={onReset}>new game</button>
      </div>
    );
  }

  return (
    <div className={style.userActions}>
      <p>{cardvalues}</p>
      <div>
        <button onClick={ohHit}>Hit</button>{' '}
        <button onClick={ohHold}>Hold</button>
      </div>
    </div>
  );
};

interface DealtHandT {
  dealtCards?: DealtCard[];
  handType?: string;
  activeGame?: string;
}

const DealtHand = ({
  dealtCards,
  handType,
  activeGame = 'blackjack',
}: DealtHandT) => {
  const hiddenCard = activeGame === 'blackjack' && handType === 'dealer';
  const [cardsDealt, setCardDealt] = React.useState(() => dealtCards);

  // const { gamesStatus, updateGameStatus } = useContext(GameStateContext);

  // create an action useReducer, one place to control user actions.
  const onHoldCall = () => {
    console.log(' users wishes to hold and contiue the game contiues');
  };
  const onHitCall = () => {
    // should call to the  API using the requesting on card on active deck

    let newCard = cardsDealt[0];
    console.log('fetch another from the deck');

    setCardDealt([...cardsDealt, newCard]);
  };
  const onResetCall = () => {
    //
    setCardDealt(dealtCards);
  };

  const cardvalues = cardsDealt
    .map((x) => Number(x.value))
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  if (cardsDealt.length === 0) {
    return <div>EMPTY</div>;
  }

  return (
    <div className={style.hand_self}>
      <div className={style.card_container}>
        {cardsDealt.map((card, indx) => (
          <Card
            key={card.code}
            card={card}
            index={indx}
            hiddenCard={hiddenCard}
          />
        ))}
      </div>
      {!hiddenCard ? (
        <UserControl
          cardvalues={cardvalues}
          onReset={() => onResetCall()}
          ohHit={() => onHitCall()}
          ohHold={() => onHoldCall()}
        />
      ) : null}
    </div>
  );
};

export default DealtHand;
