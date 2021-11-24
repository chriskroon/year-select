$(document).on('click', '.year-select .select-years-container .pick-year.selectable', function(e){
  var year = parseInt($(this).text()),
      ele = $('[year-select-identifier-input="' + $(this).attr('year-select-identifier') + '"]')
  ele.val(year)
  $('body').find('.year-select').remove()  
})

$(document).on('click', '.year-select a.year-close', function(e){
  e.preventDefault()
  $('body').find('.year-select').remove()  
})

function showYear(ele,options){
  $('body').find('.year-select').remove()
  var date = new Date(),
      nowYear = parseInt(date.getFullYear()),
      year = (parseInt(ele.val()) > 0 ? parseInt(ele.val()) : parseInt(date.getFullYear())),
      years = [],
      yearLeft = ele.offset().left,
      yearTop = ele.offset().top + ele.outerHeight() + 5,
      html = '',
      before_now = options.years_before_now ? options.years_before_now : 30,
      after_now = (options.years_after_now ? options.years_after_now : 10) + 1,
      identifier = Math.floor(Math.random() * 10000000)
  
  ele.attr('year-select-identifier-input', identifier)
  
  while(before_now > 0){
    years.push(nowYear - before_now)
    before_now --
  }
  after_now_loop = (after_now)
  while(after_now_loop > 0){
    years.push(nowYear + Math.abs(after_now_loop - after_now))
    after_now_loop --
  }
  var html = '<div class="year-select" style="left:' + yearLeft + 'px;top:' + yearTop +'px">'
  html += '<div class="selected-year">' + year + '<a class="year-close">x</a></div>'
  html += '<div class="select-years-container">'
  years.forEach(function(value){
    var theClass = (year == value ? 'active' : 'selectable')
    html += '<div class="pick-year ' + theClass + '" year-select-identifier="' + identifier + '">' + value +'</div>'
  })
  html += '</div>'
  html += '</div>'
  $('body').append(html)
  $('.year-select .select-years-container').animate({
    scrollTop: ($('.year-select .pick-year.active').offset().top - yearTop - $('.year-select .selected-year').outerHeight() - $('.year-select .pick-year.active').outerHeight())
  },0)
}