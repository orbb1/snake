const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };

const getInitialState = () => ({
  cols: 20,
  rows: 15,
  apple: { x: 10, y: 7 },
  snake: [],
  move: [DOWN],
});

const getRandomPos = () => ({
  x: Math.floor(Math.random() * getInitialState().cols) + 0,
  y: Math.floor(Math.random() * getInitialState().rows) + 0,
});
const checkIfEqual = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
const dropLast = snakeArr => snakeArr.slice(0, snakeArr.length - 1);
const getProp = key => obj => obj[key];
const move = x => y => ((y % x) + x) % x;
const nextHead = state => state.snake.length < 1
  ? { x: 10, y: 2 }
  : {
    x: move(state.cols)(state.snake[0].x + state.move[0].x),
    y: move(state.rows)(state.snake[0].y + state.move[0].y),
  };
const willEat = state => checkIfEqual(nextHead(state))(state.apple);
const nextApple = state => willEat(state) ? getRandomPos(state) : state.apple;
const nextSnake = state => willEat(state)
  ? [nextHead(state)].concat(state.snake)
  : [nextHead(state)].concat(dropLast(state.snake));
const makeNextState = newState => oldState => Object.keys(newState)
  .map(key => ({ [key]: newState[key](oldState) }))
  .reduce((acc, obj) => Object.assign(acc, obj), {});

const nextState = makeNextState({
  rows: getProp('rows'),
  cols: getProp('cols'),
  apple: nextApple,
  snake: nextSnake,
  move: () => [DOWN],
});

export { getInitialState, nextState };
