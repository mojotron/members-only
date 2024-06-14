const searchFormEle = document.querySelector('#search-form');
const searchInputEle = document.querySelector('#search-bar');
const btnNextPage = document.querySelector('#btn-next-page');
const btnPrevPage = document.querySelector('#btn-prev-page');

const setQueryParamsAndRefresh = (searchTerm, pageNum) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('search', searchTerm);
  searchParams.set('page', pageNum);
  const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
  location.assign(newRelativePathQuery);
};

const handleChangePage = e => {
  const { currentPage, direction } = e.target.dataset;
  const pageNum = parseInt(currentPage, 10);
  if (direction === 'next') {
    setQueryParamsAndRefresh(searchInputEle.value, pageNum + 1);
  } else {
    setQueryParamsAndRefresh(searchInputEle.value, pageNum - 1);
  }
};

if (searchFormEle) {
  searchFormEle.addEventListener('submit', e => {
    e.preventDefault();
    setQueryParamsAndRefresh(searchInputEle.value, 1);
  });
}

if (btnNextPage) {
  btnNextPage.addEventListener('click', handleChangePage);
}

if (btnPrevPage) {
  btnPrevPage.addEventListener('click', handleChangePage);
}
