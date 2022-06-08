import { render, remove, RenderPosition } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import { UserAction, UpdateType, BLANK_POINT } from '../const.js';


export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #destinationsModel = null;
  #offersModel = null;

  #destinations = [];
  #offers = [];

  constructor(pointListContainer, destinationsModel, changeData, offersModel) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new FormEditView(BLANK_POINT, this.#destinations, this.#offers);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setClickHandler(this.#handleFormClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormClick = () => {
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
