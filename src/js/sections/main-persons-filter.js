function counterBehavior(name, counterId, limit, children) {
  const counter = document.getElementById(counterId);
  const counterName = name.toString();
  const textBlock = document.querySelector('.counter-opener');
  const text = document.createElement('span');
  const minusBtn = counter.nextElementSibling;
  const plusBtn = counter.previousElementSibling;
  plusBtn.classList.add('count-btn-count-btn-disable');
  let count = 0;
  counter.textContent = count;
  text.textContent = `${count} ${counterName} `;
  textBlock.appendChild(text);
  const btnStatus = () => {
    if (count === limit) {
      minusBtn.classList.add('count-btn-disable');
    }
    if (count !== limit) {
      minusBtn.classList.remove('count-btn-disable');
    }
    if (count === 0) {
      plusBtn.classList.add('count-btn-disable');
    }
    if (count !== 0) {
      plusBtn.classList.remove('count-btn-disable');
    }
  };

  const resize = () => {
    const counterBody = document.getElementById('counter-body');
    counterBody.style.maxHeight = `${counterBody.scrollHeight}px`;
  };

  let selectCount = 0;

  const createSelect = () => {
    const counterBody = document.getElementById('counter-body');
    const childBlock = document.createElement('div');
    childBlock.classList.add('child-block');
    childBlock.textContent = 'What is the age of the child you’re travelling with?';
    if (selectCount < 1) {
      counterBody.appendChild(childBlock);
    }
    if (selectCount < 10) {
      selectCount += 1;
      const select = document.createElement('select');
      select.classList.add('child-select');
      select.id = `select${selectCount}`;
      counterBody.appendChild(select);
      for (let i = 0; i <= 17; i += 1) {
        const age = document.createElement('option');
        age.value = i;
        age.text = `${i} years old`;
        select.appendChild(age);
      }
    }
    resize();
  };

  const removeSelect = () => {
    const childBlock = document.querySelector('.child-block');
    if (selectCount > 0) {
      const select = document.getElementById(`select${selectCount}`);
      select.remove();
      selectCount -= 1;
      childBlock.style.maxHeight = `${childBlock.scrollHeight}px`;
    }
    if (selectCount < 1) {
      childBlock.remove();
    }
    resize();
  };

  const increase = (event) => {
    event.preventDefault();
    if (count < limit) {
      count += 1;
      counter.textContent = count;
      text.textContent = `${count} ${counterName} `;
      if (children === true) {
        createSelect();
      }
    }
    btnStatus();
    resize();
  };

  const decrease = (event) => {
    event.preventDefault();
    if (count > 0) {
      count -= 1;
      counter.textContent = count;
      text.textContent = `${count} ${counterName} `;
      if (children === true) {
        removeSelect();
      }
    }
    btnStatus();
    resize();
  };
  const counterOpener = document.getElementsByClassName('counter-opener');
  for (let i = 0; i < counterOpener.length; i += 1) {
    counterOpener[i].addEventListener('click', function (event) {
      event.preventDefault();
      this.classList.toggle('active');
      const counterBody = this.nextElementSibling;
      if (counterBody.style.maxHeight) {
        counterBody.style.maxHeight = null;
      } else {
        counterBody.style.maxHeight = `${counterBody.scrollHeight}px`;
      }
    });
  }
  minusBtn.addEventListener('click', increase);
  plusBtn.addEventListener('click', decrease);
}

counterBehavior('Adults', 'adult-count', 30);
counterBehavior('Children', 'children-count', 10, true);
counterBehavior('Rooms', 'rooms-count', 30);
