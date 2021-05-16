import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }

  update(update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1),
    ];

    this._notify(update);
  }

  addComment(update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(update);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
      {},
      comment,
      {
        date: new Date(comment.date),
      },
    );

    return adaptedComment;
  }
}
