import NewsCard from '../../blocks/news-card/NewsCard';

const createNewsCard = args => new NewsCard(args);

const getFromDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

const getToDate = () => {
  const date = new Date();
  const currentTimestamp = date.getTime();
  const week = (1000 * 60 * 60 * 24 * 7);
  const prevWeekTimestamp = currentTimestamp - week;
  const prevWeek = new Date(prevWeekTimestamp);
  const year = prevWeek.getFullYear();
  const month = prevWeek.getMonth() + 1;
  const day = prevWeek.getDate();

  return `${year}-${month}-${day}`;
};

export {
  getFromDate,
  getToDate,
  createNewsCard,
};
