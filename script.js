const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const scoreEl = document.getElementById('score');
const resetBtn = document.getElementById('reset');

let score = 0;

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', drop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.type);
  e.dataTransfer.setData('text/id', e.target.innerText);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const binType = e.target.dataset.type;
  const itemType = e.dataTransfer.getData('text/plain');
  const itemEmoji = e.dataTransfer.getData('text/id');

  if (binType === itemType) {
    score += 10;
    scoreEl.textContent = score;
    e.target.classList.add('correct');
    setTimeout(() => e.target.classList.remove('correct'), 500);
    const matchedItem = Array.from(items).find(i => i.dataset.type === itemType && i.innerText === itemEmoji);
    if (matchedItem) matchedItem.remove();
  } else {
    e.target.classList.add('incorrect');
    setTimeout(() => e.target.classList.remove('incorrect'), 500);
  }
}

resetBtn.addEventListener('click', () => {
  location.reload();
});
