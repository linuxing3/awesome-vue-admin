/**
 *  inflection.js
 *  ---------------------------------------------------------
 *  - inflection.indexOf( arr, item, from_index, compare_func );
 *  - inflection.pluralize( str, plural );
 *  - inflection.singularize( str, singular );
 *  - inflection.inflect( str, count, singular, plural );
 *  - inflection.camelize( str, low_first_letter );
 *  - inflection.underscore( str, all_upper_case );
 *  - inflection.humanize( str, low_first_letter );
 *  - inflection.capitalize( str );
 *  - inflection.dasherize( str );
 *  - inflection.titleize( str );
 *  - inflection.demodulize( str );
 *  - inflection.tableize( str );
 *  - inflection.classify( str );
 *  - inflection.foreign_key( str, drop_id_ubar );
 *  - inflection.ordinalize( str );
 *  - inflection.transform( str, arr );
 *  ---------------------------------------------------------
 *  change-case.js
 *  ---------------------------------------------------------
 *  changeCase.camelCase('test string')
 *  //=> "testString"
 *  changeCase.constantCase('test string')
 *  //=> "TEST_STRING"
 *  [`camel`](#camelcase)
 *  [`constant`](#constantcase)
 *  [`dot`](#dotcase)
 *  [`header`](#headercase)
 *  [`isLower`](#islowercase)
 *  [`isUpper`](#isuppercase)
 *  [`lower`](#lowercase)
 *  [`lcFirst`](#lowercasefirst)
 *  [`no`](#nocase)
 *  [`param`](#paramcase)
 *  [`pascal`](#pascalcase)
 *  [`path`](#pathcase)
 *  [`sentence`](#sentencecase)
 *  [`snake`](#snakecase)
 *  [`swap`](#swapcase)
 *  [`title`](#titlecase)
 *  [`upper`](#uppercase)
 *  [`ucFirst`](#uppercasefirst)
 */

module.exports = {
  helpers: {
    extended: s => s.toUpperCase()
  }
}
