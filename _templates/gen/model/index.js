module.exports = {
  prompt: ({
    inquirer
  }) => {
    // defining questions in arrays ensures all questions are asked before next prompt is executed
    const questions = [{
      type: 'input',
      name: 'model',
      message: 'Name of model (ex: UserBook)'
    },
    {
      type: 'input',
      name: 'fieldNames',
      message: 'Field Name(separate by comma: "age, gender, title")',
      default: 'name,active'
    },{
      type: 'confirm',
      name: 'chooseType',
      message: 'Confirm setting types for each field now?',
      default: false
    }
    ]

    return inquirer.prompt(questions).then(answers => {
      console.log(answers)
      if (answers.chooseType && answers.fieldNames.length > 0) {
        let newQuestions = []
        answers.fieldNames.split(',').forEach(fieldName => {
          newQuestions.push({
            type: 'list',
            name: fieldName.trim() + 'Type',
            message: 'Choose type for [' + fieldName.trim() + ']',
            default: 'attr',
            choices: [
              'string',
              'attr',
              'boolean',
              'number'
            ]
          })
        })
        return inquirer.prompt(newQuestions).then(moreAnswers => {
          console.log({...answers, ...moreAnswers})
          return {...answers, ...moreAnswers}
        })
      } else {
        return answers
      }
    })
  }
}
