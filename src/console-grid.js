import { getInitialState, nextState } from './snake';
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

const show = () => console.log(`\x1Bc ${Grid.toString(Grid.fromState(State))}`);
const step = () => { State = nextState(State); };

setInterval(() => { step(); show(); }, 500);
