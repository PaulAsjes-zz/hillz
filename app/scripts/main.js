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
}

Hillz.prototype.render = function() {
  let str = '';
  this.data.questions.forEach((question, index) => {
    const isArgumentList = Array.isArray(question.argument);
    str +=`
      <div class="question">
        <h3 class="title"><p>${question.title}</p></h3>
        <${isArgumentList ? 'ul' : 'div'} class="argument">${isArgumentList ?
          question.argument.map((bullet, index) => {
            return `<li>${bullet}</li>`;
          }) : `<div>${question.argument}</div>`}
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
};
