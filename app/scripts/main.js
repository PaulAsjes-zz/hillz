// hillz
let hillz;

$(function() {
  $.getJSON('/data/content.json', (data) => {
    hillz = new Hillz(data);
  });
});

function Hillz(data) {
  this.data = data;
  this.deadline = '2016-11-08';
  //this.homepage();
  this.render();
  this.initializeClock('clockdiv', this.deadline);

  // window.addEventListener('scroll', this.onScroll);
}

Hillz.prototype.homepage = function() {
  let str = '';
  str += `
    <div class="question">
      <div class="button-container">
        <div class="round-button"><div class="round-button-circle stats">stats</div></div>
        <div class="round-button"><div class="round-button-circle arg">counterarguments</div></div>
      </div>
    </div>
  `
  $('.questions-container').html(str);
}

Hillz.prototype.render = function() {
  let str = '';
  this.data.questions.forEach((question, index) => {
    const isArgumentList = Array.isArray(question.argument);
    str +=`
      <div class="question">
        <h3 class="title animated"><p>${question.title}</p><div class="more">Click for the short response</div></h3>
        <${isArgumentList ? 'ul' : 'div'} class="argument-container animated">${isArgumentList ?
          question.argument.map((bullet, index) => {
            return `<li class="argument">${bullet}${index === question.argument.length - 1 ? '<div class="source">Click to see sources</div>' : ''}</li>`;
          }).join('') : `<div class="argument animated">${question.argument}<div class="source">Click to see sources</div></div>`}
        </${isArgumentList ? 'ul' : 'div'}>
        <ul class="sources">
        ${question.sources.map((source) => {
          if (typeof source === 'object') {
            return `<li>${source.title}<br /><a href="${source.url}" target="_blank">${source.url}</a></li>`;
          } else {
            return `<li><a href="${source}" target="_blank">${source}</a></li>`;
          }
        }).join('')}
        </ul>
      </div>
      `;
  });

  $('.questions-container').html(str);

  $('.title').click(this.expandArgument.bind(this));
};

Hillz.prototype.onScroll = function() {
  $('.title').each((el) => {
  });
};

Hillz.prototype.expandArgument = function(e) {
  const $title = $(e.currentTarget);

  $title.find('.more').hide();

  $title
    .off('click')
    .css('cursor', 'default')
    .next()
    .addClass('active bounceInRight')
    .find('.source')
    .click(this.showSource.bind(this));
};

Hillz.prototype.showSource = function(e) {
  console.log($(e.currentTarget).closest('.question').find('.sources'));
  $(e.currentTarget)
    .closest('.question')
    .find('.sources')
    .slideDown();
};

Hillz.prototype.getTimeRemaining = function(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

Hillz.prototype.initializeClock = function(id, endtime){
  var clock = document.getElementById(id);
  var _this = this
  var timeinterval = setInterval(function(){
    var t = _this.getTimeRemaining(endtime);
    t.hours = (t.hours < 10) ? '0' + t.hours : t.hours;
    t.minutes = (t.minutes < 10) ? '0' + t.minutes : t.minutes;
    t.seconds = (t.seconds < 10) ? '0' + t.seconds : t.seconds;
    clock.innerHTML = '' + t.days + ':' +
                      ''+ t.hours + ':' +
                      '' + t.minutes + ':' +
                      '' + t.seconds;
    if(t.total<=0){
      clearInterval(timeinterval);
    }
  },1000);
};
