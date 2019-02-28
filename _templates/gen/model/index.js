module.exports = {
  prompt: ({
    inquirer
  }) => {
    // defining questions in arrays ensures all questions are asked before next prompt is executed
    const questions = [{
      type: 'input',
      name: 'model',
      message: 'Name of model (ex: User)',
      validate (value) {
        if (!value.length) {
          return 'Vuex ORM models must have a name, better capitalized.';
        }
        if (value.indexOf('-') !== -1) {
          return 'Component names should contain one word, better capitalized.';
        }
        return true
    }
    },
    {
      type: 'input',
      name: 'fieldName',
      message: 'Default Field Name (ex: name)',
      validate (value) {
        if (!value.length) {
          return 'Field must have a name, better lowercase';
        }
        return true
    }
    },
    {
      type: 'input',
      name: 'fieldType',
      message: 'Default Field Type(ex: string, number, boolean, attr)',
      validate (value) {
        if (!value.length) {
          return 'Field must have a name, better lowercase';
        }
        return true
        }
    },
    {
      type: 'input',
      name: 'fieldValue',
      message: 'Default Field Value(ex: Daniel)',
      validate (value) {
        if (!value.length) {
          return 'Field must have a value, please name it';
        }
        return true
        }
    },
    {
      type: 'input',
      name: 'fieldNames',
      message: 'Need More Fields?(just input names separate by comma: "age,gender,title")'
    }
    ]

    return inquirer.prompt(questions).then(answers => {
      console.log(answers)
      return answers
    })
  }
}
