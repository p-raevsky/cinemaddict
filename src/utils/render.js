import Abstract from '../view/abstract.js';

export const render = (container, child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  container.append(child);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
