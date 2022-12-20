export const orderNumGenerated = () => {
  const generateOrderNum = "abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let myCode = "";
  for (let i = 0; i < 6; i++) {
    let code = Math.floor(Math.random() * generateOrderNum.length);
    myCode += generateOrderNum[code];
  }
  return myCode;
};
