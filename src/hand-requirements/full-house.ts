import { pair } from './pair';
import { three } from './three';
import { union } from './union';

export const fullHouse = union(three, pair);
