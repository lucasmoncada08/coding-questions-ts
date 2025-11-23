export function getMaximumCardsCollectable(startingCards: number): number {
  let p1CollectedCards = 0;
  let p1Turn = true;
  while (startingCards > 0) {
    console.log({ startingCards });
    let cardsTaken;
    if (isEven(startingCards)) {
      if (divideOrSubtractEven(startingCards) == "divide")
        cardsTaken = startingCards / 2;
      else cardsTaken = 1;
    } else {
      cardsTaken = 1;
    }
    console.log({ cardsTaken });
    startingCards -= cardsTaken;
    if (p1Turn) p1CollectedCards += cardsTaken;
    p1Turn = !p1Turn;
    console.log({ p1CollectedCards });
  }

  return p1CollectedCards;
}

function isEven(num: number): boolean {
  return num % 2 == 0;
}

export function divideOrSubtractEven(n: number) {
  if (n % 4 == 0) return "subtract";
  return "divide";
}
