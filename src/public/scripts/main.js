const searchFormEle = document.querySelector('#search-form');
const searchInputEle = document.querySelector('#search-bar');

searchFormEle.addEventListener('submit', e => {
  e.preventDefault();

  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set('search', searchInputEle.value);

  const newRelativePathQuery = `${window.location.pathname}?${queryParams.toString()}`;

  location.assign(newRelativePathQuery);
});
