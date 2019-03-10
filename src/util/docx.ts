import { Styles } from 'docx'

export const myStyles = new Styles()

// The first argument is an ID you use to apply the style to paragraphs
// The second argument is a human-friendly name to show in the UI
myStyles
  .createParagraphStyle('myWorkStyle', 'My Work Style')
  .basedOn('Normal')
  .next('Normal')
  .color('999999')
  .italics()
  .indent({ spacing: 720 }) // 720 TWIP === 720 / 20 pt === .5 in
  .spacing({ line: 276 }) // 276 / 240 = 1.15x line spacing

myStyles
  .createParagraphStyle('Heading2', 'Heading 2')
  .basedOn('Normal')
  .next('Normal')
  .quickFormat()
  .size(26) // 26 half-points === 13pt font
  .bold()
  .underline('double', 'FF0000')
  .spacing({ before: 240, after: 120 }) // TWIP for both
