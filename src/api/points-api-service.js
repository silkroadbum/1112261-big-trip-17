import ApiService from '../framework/api-service';
import { Method } from '../const';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      header: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedREsponse = await ApiService.parseResponse(response);

    return parsedREsponse;
  };
}
