const _ = require("lodash");

module.exports = [
  {
    type: "input",
    name: "model",
    message: "Model Name: (i.e. User)",
    validate(value) {
      if (!value.length) {
        return "Components must have a name, better capitalized.";
      }
      if (value.indexOf("-") !== -1) {
        return "Model names should contain only one word, avoid using - or _.";
      }
      return true;
    },
  },
];
