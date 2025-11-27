const itemsContainer = document.getElementById('items-container');
const bins = document.querySelectorAll('.bin');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let score = 0;

function createItems() {
  const itemsData = [
    { emoji: '🍌', type: 'organic' },
    { emoji: '🥕', type: 'organic' },
    { emoji: '🍾', type: 'glass' },
    { emoji: '🥛', type: 'glass' },
    { emoji: '💿', type: 'plastic' },
    { emoji: '🧴', type: 'plastic' },
    { emoji: '📰', type: 'paper' },
    { emoji: '📑', type: 'paper' }
  ];

  const shuffledItems = itemsData.sort(() => Math.random() - 0.5);

  itemsContainer.innerHTML = '';
  shuffledItems.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.setAttribute('draggable', 'true');
    div.dataset.type = item.type;
    div.textContent = item.emoji;
    itemsContainer.appendChild(div);
    div.addEventListener('dragstart', dragStart);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.type);
  e.dataTransfer.setData('text/id', e.target.innerText);
}

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', drop);
});

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
    messageEl.textContent = 'جيد جدا! إجابتك صحيحة يا ذكي 🎉';
    e.target.classList.add('correct');
    setTimeout(() => e.target.classList.remove('correct'), 500);
    const matchedItem = Array.from(document.querySelectorAll('.item'))
      .find(i => i.dataset.type === itemType && i.innerText === itemEmoji);
    if (matchedItem) matchedItem.remove();
  } else {
    messageEl.textContent = 'خطأ! لابأس أعد المحاولة ❌';
    e.target.classList.add('incorrect');
    setTimeout(() => e.target.classList.remove('incorrect'), 500);
  }
}

resetBtn.addEventListener('click', () => {
  score = 0;
  scoreEl.textContent = score;
  messageEl.textContent = '';
  createItems();
});

createItems();
