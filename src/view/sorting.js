const SORT_TYPES = [
  'Sort by default',
  'Sort by date',
  'Sort by rating',
];

const sortTypesTemplate = (sortItem, isActive) => {
  return `<a href="#" class="sort__button ${isActive ? 'sort__button--active' : ''}">
      ${sortItem}
    </a>
  </li>`;
};

export const createSortingTemplate = () => {
  const createSortMenu = SORT_TYPES
    .map((sortTemplate, index) => sortTypesTemplate(sortTemplate, index === 0))
    .join('');

  return `<ul class="sort">
    ${createSortMenu}
  </ul>`;
};
