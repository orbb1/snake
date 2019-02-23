import { getInitialState } from './snake';
import {
  repeat, pipe, adjust, k,
} from './helpers';

const State = getInitialState();

const Grid = {
  create: table => repeat(repeat('.')(table.cols))(table.rows),
  toString: xsxs => xsxs.map(xs => xs.join(' ')).join('\r\n'),
  addApple: state => adjust(state.apple.y)(adjust(state.apple.x)(k('o'))),
  fromState: state => pipe(
    Grid.create,
    Grid.addApple(state),
  )(state),
};

const show = () => console.log(`\x1Bc ${Grid.toString(Grid.fromState(State))}`);

show();
