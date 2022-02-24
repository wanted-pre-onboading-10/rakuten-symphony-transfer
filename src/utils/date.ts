export const expireDate = (expire: number) => {
  const today = new Date().getTime();
  const period = expire * 1000 - today;

  if (period < 0) return "만료됨";

  const hour = Math.floor(period / 1000 / 60 / 60);
  if (hour >= 48) return `${Math.floor(hour / 24)}일`;

  const min = Math.floor(period / 1000 / 60 - hour * 60);
  return `${hour}시간 ${min.toString().padStart(2, "0")}분`;
};

export const createDate = (create: number) => {
  const date = new Date(create * 1000);

  const time = date.toTimeString().slice(0, 5);
  const standard = date.toTimeString().split(" (")[0].slice(-5);

  return (
    `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ` +
    `${time} ${standard.slice(0, 3)}:${standard.slice(3, 5)}`
  );
};
