export function getDateString(date: Date): string {
  const now = new Date();
  //   let time = now.getFullYear() - date.getFullYear();
  //   if (time) {
  //     return `${time}年前`;
  //   }
  //   let time = now.getMonth() - date.getMonth();
  //   if (time) {
  //     return `${time}月前`;
  //   }
  let time = now.getDate() - date.getDate();
  if (time) {
    //   因为是12 月写的
    if (time < 0) {
      time = 31 + time;
    }
    return `${time}天前`;
  }
  time = now.getHours() - date.getHours();
  if (time) {
    return `${time}小时前`;
  }
  time = now.getMinutes() - date.getMinutes();
  if (time) {
    return `${time}分钟前`;
  }
  time = now.getSeconds() - date.getSeconds();
  if (time) {
    return `${time}秒前`;
  }
  // 1000 ms 60 s 60 min 24
  //  应该用coment js  只能到天，没有到月份

  return "";
}
