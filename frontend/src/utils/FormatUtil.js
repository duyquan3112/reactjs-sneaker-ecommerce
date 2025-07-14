const FormatUtil = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  formatPrice: (num) => num.toLocaleString("vi-VN") + "₫",
};
export default FormatUtil;
