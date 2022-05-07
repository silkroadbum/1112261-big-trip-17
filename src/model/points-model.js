import { generatePoint } from '../mock/points.js';
import { NUM_OF_POINTS } from '../const.js';

export default class PointsModel {
  #points = Array.from({ length: NUM_OF_POINTS }, generatePoint);

  get points() {
    return this.#points;
  }
}
