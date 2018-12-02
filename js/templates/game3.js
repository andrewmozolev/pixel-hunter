const getOption = (option, index) => `
    <div class="game__option">
        <img class="game__image" src="${option[0]}" alt="Option ${index + 1}" width="304" height="455">
    </div>`;

export default (level) => `
      <form class="game__content  game__content--triple">
        ${level.map((getOption)).join(``)}
      </form>`;
