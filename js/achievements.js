'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const NUMBER_OF_ACHIEVEMENTS = 100;

  const templateAchievement = document.getElementById('template-achievement');
  const boxAchievement = document.getElementById('box-achievement');

  for (let i = 0; i < NUMBER_OF_ACHIEVEMENTS; i++) {
    let templateAchievementClone = templateAchievement.content.cloneNode(true);
    templateAchievementClone
      .querySelector('.achievement__number-text')
        .textContent = i + 1;
    boxAchievement.appendChild(templateAchievementClone);
  }

});
