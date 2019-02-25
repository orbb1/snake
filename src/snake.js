const vectors = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
};

const getInitialState = () => ({
  cols: 20,
  rows: 15,
  apple: { x: 10, y: 7 },
  snake: [],
  move: [vectors.DOWN],
});

const getRandomPos = () => ({
  x: Math.floor(Math.random() * getInitialState().cols) + 0,
  y: Math.floor(Math.random() * getInitialState().rows) + 0,
});
const checkIfEqual = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
const checkIfValidMove = move => state => (
  state.move[0].x + move.x !== 0 || state.move[0].y + move.y !== 0
);

const addMove = (state, vector) => checkIfValidMove(vector)(state)
  ? Object.assign({}, state, { move: state.move.concat([vector]) })
  : state;
const dropLast = snakeArr => snakeArr.slice(0, snakeArr.length - 1);
const dropFirst = snakeArr => snakeArr.slice(1);
const getProp = key => obj => obj[key];
const calcPos = x => y => ((y % x) + x) % x;
const nextHead = state => state.snake.length < 1
  ? { x: 10, y: 2 }
  : {
    x: calcPos(state.cols)(state.snake[0].x + state.move[0].x),
    y: calcPos(state.rows)(state.snake[0].y + state.move[0].y),
  };
const willCrash = state => state.snake.find(checkIfEqual(nextHead(state)));
const willEat = state => checkIfEqual(nextHead(state))(state.apple);
const nextApple = state => willEat(state) ? getRandomPos(state) : state.apple;
const willLive = state => willEat(state)
  ? [nextHead(state)].concat(state.snake)
  : [nextHead(state)].concat(dropLast(state.snake));
const nextSnake = state => willCrash(state)
  ? []
  : willLive(state);
const nextMoves = state => state.move.length > 1 ? dropFirst(state.move) : state.move;
const makeNextState = newState => oldState => Object.keys(newState)
  .map(key => ({ [key]: newState[key](oldState) }))
  .reduce((acc, obj) => Object.assign(acc, obj), {});

const nextState = makeNextState({
  rows: getProp('rows'),
  cols: getProp('cols'),
  apple: nextApple,
  snake: nextSnake,
  move: nextMoves,
});

export {
  getInitialState, nextState, addMove, vectors,
};
