const currentDate = new Date();

export function subsequentDaysFiter(tasksList, subsequentDays) {
  return tasksList.filter((i) => {
    const itemDate = new Date(i.date);

    if (
      currentDate.getFullYear() === itemDate.getFullYear() &&
      currentDate.getMonth() === itemDate.getMonth() &&
      currentDate.getDate() + subsequentDays === itemDate.getDate()
    ) {
      return i;
    }
  });
}

export function previousDaysFiter(tasksList) {
  return tasksList.filter((i) => {
    const itemDate = new Date(i.date);

    if (currentDate > itemDate) {
      return i;
    }
  });
}
