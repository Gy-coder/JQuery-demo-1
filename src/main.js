const $test = $('#test')
$test.print()
const $class = $('.class')


console.log($('body').find('.ab'))
$('.class').parent().print()

$('body').children().print()

const $new = $('<p>123</p>')

console.log($new)
$('body').append($new)

// $('.class').appendTo($('.ab'))

$new.appendTo($('#test'))

$('#test').remove('.class')


