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
  this.render();

  window.odometerOptions = {
    duration: 5000,
    auto: false
  };

  this.initializeClock(this.deadline);
}

Hillz.prototype.render = function() {
  let str = '';
  this.data.questions.forEach((question, index) => {
    const twitter = `<a href="https://twitter.com/intent/tweet?button_text=ReasonForHillary" class="twitter-hashtag-button" data-text="I found this reason for Hillary: http://thereasonguide.com/#${question.link} #ReasonForHillary" data-show-count="false">Tweet this</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>`;

    const isArgumentList = Array.isArray(question.argument);

    str +=`
      <div class="question">
        <h3 class="title animated"><p><a name=${question.link}>${question.title}</a></p><div class="more">Click for the short response</div></h3>
        <${isArgumentList ? 'ul' : 'div'} class="argument-container animated">${isArgumentList ?
          question.argument.map((bullet, index) => {
            return `<li class="argument">${bullet}${index === question.argument.length - 1 ? `<div class="source">Click to see sources</div>${twitter}` : ''}</li>`;
          }).join('') : `<div class="argument animated">${question.argument}<div class="source">Click to see sources</div>${twitter}</div>`}
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

Hillz.prototype.expandArgument = function(e) {
  const $title = $(e.currentTarget);

  $title.find('.more').html("Click to close");

  $title
    .click(this.closeArgument.bind(this));

  $title
    .next()
    .addClass('active bounceInRight')
    .find('.source')
    .click(this.showSource.bind(this));
};

Hillz.prototype.closeArgument = function(e) {
  const $title = $(e.currentTarget);

  $title.next().removeClass('active bounceInRight'); /* TODO - can this be animated better */

  $title.find('.more')
    .html("Click for the short response")

  this.closeSource($title.parent().find('sources')) /*TODO - how the eff do i handle this - sources aren't hidden*/

  $title.click(this.expandArgument.bind(this))
}

Hillz.prototype.showSource = function(e) {
  $(e.currentTarget)
    .html('close sources')
    .closest('.question')
    .find('.sources')
    .slideDown();

  $(e.currentTarget)
    .click(this.closeSource.bind(this))
};

Hillz.prototype.closeSource = function(e) { /*TODO - occasionally something weird happens and it repeatedly open/closes*/
  $(e.currentTarget)
    .html('Click to see sources')
    .closest('.question')
    .find('.sources')
    .slideUp();

  $(e.currentTarget)
    .click(this.showSource.bind(this));
}

Hillz.prototype.getTimeRemaining = function(endtime){
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (t/1000) % 60 );
  const minutes = Math.floor( (t/1000/60) % 60 );
  const hours = Math.floor( (t/(1000*60*60)) % 24 );
  const days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

Hillz.prototype.initializeClock = function(endtime){
  const timer = document.querySelector('#clockdiv');
  const odometer = new Odometer({
    el: timer,
    value: 0,
    format: '(:dd)',
    duration: 1000
  });

  const timeinterval = setInterval(() => {
    const t = this.getTimeRemaining(endtime);
    t.hours = (t.hours < 10) ? '0' + t.hours : t.hours;
    t.minutes = (t.minutes < 10) ? '0' + t.minutes : t.minutes;
    t.seconds = (t.seconds < 10) ? '0' + t.seconds : t.seconds;

    const time = `${t.days}${t.hours}${t.minutes}${t.seconds}`;
    odometer.update(parseInt(time, 10));

   /* $('.days').html(t.days);
    $('.hours').html(t.hours);
    $('.minutes').html(t.minutes);
    $('.seconds').html(t.seconds);*/

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
};
