const pagination = (count, paginate) => {
  const numberOfPages = Math.ceil(count / paginate.limit);
  const mainPage = parseInt(paginate.page);
  const meta = {
    page: mainPage,
    limit: paginate.limit,
    previousPage: mainPage > 1 ? parseInt(mainPage - 1) : false,
    nextPage: numberOfPages > mainPage ? mainPage + 1 : false,
    pageCount: numberOfPages,
    total: count,
  };

  return meta;
};

module.exports = pagination;
