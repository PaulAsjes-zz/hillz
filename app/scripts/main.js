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
        <h3 class="title animated"><p>${question.title}</p></h3>
        <${isArgumentList ? 'ul' : 'div'} class="argument-container">${isArgumentList ?
          question.argument.map((bullet, index) => {
            return `<li class="argument animated">${bullet}</li>`;
          }).join('') : `<div>${question.argument}</div>`}
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
  const $current = $(e.currentTarget);
  $current.off('click').css('cursor', 'default');


};
