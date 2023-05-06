function moveEnemy(enemy) {
  let interval; // Объявляем переменную на уровне функции

  function moveLeft(obj) {
    let width = obj.offsetWidth; // Получаем ширину объекта
    let pos = parseInt(obj.style.left);
    interval = setInterval(() => {
      if (pos <= -width || document.elementFromPoint(pos - 1, parseInt(obj.style.top))?.classList.contains('tileW')) {
        clearInterval(interval);
        moveRight(obj); // Объект достиг границы, меняем направление
      } else {
        pos -= obj.speed;
        obj.style.left = pos + 'px';
        
        if (enemy.health <= 0) {
          clearInterval(interval);
          removeEnemy();
        }
      }
    }, 100);
  }

  function moveRight(obj) {
    let width = obj.offsetWidth;
    let pos = parseInt(obj.style.left);
    interval = setInterval(() => {
      if (pos >= 450 || document.elementFromPoint(pos + width, parseInt(obj.style.top))?.classList.contains('tileW')) {
        clearInterval(interval);
        moveLeft(obj);
      } else {
        pos += obj.speed;
        obj.style.left = pos + 'px';

        if (enemy.health <= 0) {
          clearInterval(interval);
          removeEnemy();
        }
      }
    }, 100);
  }

  function moveTop(obj) {
    let height = obj.offsetHeight; // Получаем высоту объекта
    let pos = parseInt(obj.style.top);
    interval = setInterval(() => {
      if (pos <= -height || document.elementFromPoint(parseInt(obj.style.left), pos - 1)?.classList.contains('tileW')) {
        clearInterval(interval);
        moveBottom(obj);
      } else {
        pos -= obj.speed;
        obj.style.top = pos + 'px';

        if (enemy.health <= 0) {
          clearInterval(interval);
          removeEnemy();
        }
      }
    }, 100);
  }

  function moveBottom(obj) {
    let height = obj.offsetHeight;
    let pos = parseInt(obj.style.top);
    interval = setInterval(() => {
      if (pos >= 450 || document.elementFromPoint(parseInt(obj.style.left), pos + height)?.classList.contains('tileW')) {
        clearInterval(interval);
        moveTop(obj);
      } else {
        pos += obj.speed;
        obj.style.top = pos + 'px';

        if (enemy.health <= 0) {
          clearInterval(interval);
          removeEnemy();
        }
      }
    }, 100);
  }

  function removeEnemy() {
    enemy.parentNode.removeChild(enemy); // удаляем объект из DOM дерева
  }

  moveRight(enemy); // Начинаем движение вправо
}
