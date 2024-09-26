export const getPreviousDate = (numDays: number) => {
  const currentDate = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(currentDate.getDate() - numDays);
  return Math.floor(daysAgo.getTime() / 1000);
};

export const getCurrentDate = () => {
  return Math.floor(new Date().getTime() / 1000);
};
