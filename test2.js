import { number } from "@inquirer/prompts";

const moveLeft = (data, select) => {
  const result = [...data];
  const selectedList = select
    .map((s) => result.findIndex((res) => res === s))
    .sort((a, b) => a - b);

  let isBlocked = false;

  selectedList.forEach((current, i) => {
    const previous = current - 1;

    if (previous < 0) {
      isBlocked = true;
      return;
    }
    if (isBlocked) isBlocked = previous === selectedList[i - 1];
    if (isBlocked) return;

    [result[current], result[previous]] = [result[previous], result[current]];
  });

  return result;
};

const data = [];
const selectList = [];

while (true) {
  const inputValue = await number({
    message: `data list 값을 입력해주세요. enter만 입력하면 data 입력을 종료합니다.\n`,
    validate: (value) => {
      if (data.includes(value)) return "동일한 값이 존재합니다.";
      return true;
    },
  });

  if (!inputValue) break;

  data.push(inputValue);
}

console.log("입력된 data list", data);

while (data.length !== selectList.length) {
  const inputValue = await number({
    message: `select list 값을 입력해주세요. enter만 입력하면 left move를 실행합니다.\n`,
    validate: (value) => {
      if (value === undefined) return true;
      if (!data.includes(value)) return "data list에 값이 존재않습니다.";
      return true;
    },
  });

  if (!inputValue) break;

  selectList.push(inputValue);
}

console.log("변경 전:", data);
console.log("변경 후:", moveLeft(data, selectList));
