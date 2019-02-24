import * as readline from 'readline';
import {
  getInitialState, nextState, addMove, vectors,
} from './snake';
import {
  repeat, pipe, adjust, k,
} from './helpers';

let State = getInitialState();

const Grid = {
  create: table => repeat(repeat('.')(table.cols))(table.rows),
  toString: xsxs => xsxs.map(xs => xs.join(' ')).join('\r\n'),
  set: val => pos => adjust(pos.y)(adjust(pos.x)(k(val))),
  addApple: state => adjust(state.apple.y)(adjust(state.apple.x)(k('o'))),
  addSnake: state => pipe(
    ...state.snake.map(Grid.set('X')),
  ),
  fromState: state => pipe(
    Grid.create,
    Grid.addSnake(state),
    Grid.addApple(state),
  )(state),
};

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') process.exit();
  switch (key.name.toUpperCase()) {
    case 'W': case 'UP': State = addMove(State, vectors.UP); break;
    case 'A': case 'LEFT': State = addMove(State, vectors.LEFT); break;
    case 'S': case 'DOWN': State = addMove(State, vectors.DOWN); break;
    case 'D': case 'RIGHT': State = addMove(State, vectors.RIGHT); break;
    default: console.log('press WASD or arrows');
  }
});

const show = () => console.log(`\x1Bc ${Grid.toString(Grid.fromState(State))}`);
const step = () => { State = nextState(State); };

setInterval(() => { step(); show(); }, 200);
