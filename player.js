function isColliding(element, tiles, characterHealth, characterAttack) {
  var characterRect = element.getBoundingClientRect();

  for (var i = 0; i < tiles.length; i++) {
    var tileRect = tiles[i].getBoundingClientRect();

    // Проверяем, что персонаж пересекается с плиткой.
    if (
      characterRect.bottom > tileRect.top &&
      characterRect.top < tileRect.bottom &&
      characterRect.right > tileRect.left &&
      characterRect.left < tileRect.right
    ) {
      // Проверяем, что плитка имеет класс tileH (плитка здоровья).
      if (tiles[i].classList.contains("tileHP")) {
        // Увеличиваем здоровье персонажа на 10.
        element.health += 10;
        // Удаляем плитку здоровья из DOM-дерева.
        tiles[i].remove();
      }
      // Проверяем, что плитка имеет класс tileE (плитка опасности).
      else if (tiles[i].classList.contains("tileE")) {
        // Уменьшаем здоровье персонажа на 20.

        element.health -= 20;

        // Добавляем логику атаки.
        var adjTiles = getAdjacentTiles(tiles[i], tiles);
        for (var j = 0; j < adjTiles.length; j++) {
          if (adjTiles[j].classList.contains('tileP')) {
            adjTiles[j].health -= characterAttack;
          }
        }

        document.querySelector('.health').style.width = `${element.health}%`; // Обновляем ширину полоски здоровья

        if (element.health <= 0) {
          // Обновляем страницу.
          location.reload();
        }

        return true;
      }
      // Проверяем, что плитка имеет класс tileW (стена).
      else if (tiles[i].classList.contains("tileW")) {
        return true;
      }
      // Проверяем, что плитка имеет класс tileSW (меч).
      else if (tiles[i].classList.contains("tileSW")) {
        // Увеличиваем атаку персонажа на 30.
        element.attack+= 30;
        // Удаляем меч из DOM-дерева.
        tiles[i].remove();
      }
    }
  }

  document.querySelector('.health').style.width = `${element.health}%`; // Обновляем ширину полоски здоровья
  return false;
}

function getAdjacentTiles(tile, tiles) {
  var adjacentTiles = [];
  var tileRect = tile.getBoundingClientRect();

  for (var i = 0; i < tiles.length; i++) {
    var otherTileRect = tiles[i].getBoundingClientRect();

    switch (true) {
      case tile != tiles[i] &&
           tileRect.bottom == otherTileRect.bottom &&
           tileRect.left == otherTileRect.right:
      case tile != tiles[i] &&
           tileRect.right == otherTileRect.left && 
           tileRect.top == otherTileRect.top:
        adjacentTiles.push(tiles[i]);
        break;
    }
  }

  return adjacentTiles;
}

function moveCharacter(event) {
  var element = document.getElementById("character");
  var style = window.getComputedStyle(element);
  var top = parseInt(style.getPropertyValue("top"));
  var left = parseInt(style.getPropertyValue("left"));
  var tiles = document.querySelectorAll(".tile");
  var characterHealth = character.health;
  var characterAttack = character.attack;

  switch (event.keyCode) {
    // Клавиша "W".
    case 87:
      top -= character.speed;
      element.style.top = top + "px";

      // Проверяем, не столкнулся ли персонаж с другим элементом после движения.
      if (isColliding(element, tiles, characterHealth, characterAttack)) {
        top += character.speed;
        element.style.top = top + "px";
      }

      break;
    // Клавиша "A".
    case 65:
      left -= character.speed;
      element.style.left = left + "px";

      if (isColliding(element, tiles, characterHealth, characterAttack)) {
        left += character.speed;
        element.style.left = left + "px";
      }

      break;
    // Клавиша "S".
    case 83:
      top += character.speed;
      element.style.top = top + "px";

      if (isColliding(element, tiles, characterHealth, characterAttack)) {
        top -= character.speed;
        element.style.top = top + "px";
      }

      break;
    // Клавиша "D".
    case 68:
      left += character.speed;
      element.style.left = left + "px";

      if (isColliding(element, tiles, characterHealth, characterAttack)) {
        left -= character.speed;
        element.style.left = left + "px";
      }

      break;

    // Клавиша "Space"
    case 32:
      var enemies = document.querySelectorAll('.tileE'); // Найти всех врагов на поле
      for (var i = 0; i < enemies.length; i++) {
        var enemyRect = enemies[i].getBoundingClientRect();
        var distance = Math.sqrt((enemyRect.x - element.getBoundingClientRect().x)**2 + (enemyRect.y - element.getBoundingClientRect().y)**2); // Расстояние до врага
        if (distance <= 100) { // Проверка расстояния до врага
          enemies[i].health -= characterAttack;
        }
      }
      break;
  }
}

function checkCollisions() {
  var element = document.getElementById("character");
  var tiles = document.querySelectorAll(".tile");
  var characterHealth = character.health;
  var characterAttack = character.attack;

  return isColliding(element, tiles, characterHealth, characterAttack);
}

setInterval(function() {
  if (checkCollisions()) {
  } 
}, 1000);

// Добавляем обработчик событий для нажатия клавиш на клавиатуре.
document.addEventListener("keydown", moveCharacter);
