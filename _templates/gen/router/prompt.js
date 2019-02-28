module.exports = [
  {
    type: "input",
    name: "model",
    message: "Model Name: (i.e. User)",
    validate(value) {
      if (!value.length) {
        return "Components must have a name.";
      }
      if (value.indexOf("-") !== -1) {
        return "Model names should contain only one words, avoid using - or _.";
      }
      return true;
    },
  },
];
