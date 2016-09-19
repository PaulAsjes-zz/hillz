// hillz
let hillz;

$(function() {
  $.getJSON('/data/content.json', (data) => {
    hillz = new Hillz(data);
  });
});

function Hillz(data) {
  this.data = data;

  this.render();

  // window.addEventListener('scroll', this.onScroll);
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
            return `<li class="argument">${bullet}${index === question.argument.length - 1 ? `<div class="source">Click to see sources</div>` : ''}</li>`;
          }).join('') : `<div class="argument animated">${question.argument}<div class="source">Click to see sources</div></div>`}
        </${isArgumentList ? 'ul' : 'div'}>
        <ul class="sources">
        ${question.sources.map((source) => {
          return `<li><a href="${source}" target="_blank">${source}</a></li>`;
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
