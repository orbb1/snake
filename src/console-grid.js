import { getInitialState } from './snake';
import { repeat, pipe } from './helpers';

const State = getInitialState();

const Grid = {
  create: table => repeat(repeat('.')(table.cols))(table.rows),
  toString: xsxs => xsxs.map(xs => xs.join(' ')).join('\r\n'),
  fromState: state => pipe(
    Grid.create,
  )(state),
};

const show = () => console.log(`\x1Bc ${Grid.toString(Grid.fromState(State))}`);

show();
