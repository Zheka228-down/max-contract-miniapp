const contract = document.getElementById("contract");
const confirmButton = document.getElementById("confirmButton");
const status = document.getElementById("status");

let reachedEnd = false;

// ======================================================
// Проверяем, дошёл ли пользователь до конца
// ======================================================

function checkScroll() {
  const rect = contract.getBoundingClientRect();

  const visibleBottom = window.innerHeight;

  const contractBottom = rect.bottom;

  // Запас 20 пикселей
  if (contractBottom <= visibleBottom + 20) {
    if (!reachedEnd) {
      reachedEnd = true;

      confirmButton.disabled = false;

      confirmButton.textContent = "✅ Я ознакомился с договором";

      status.textContent = "Вы дошли до конца договора.";
    }
  }
}

window.addEventListener("scroll", checkScroll);

window.addEventListener("resize", checkScroll);

// ======================================================
// Нажатие подтверждения
// ======================================================

confirmButton.addEventListener("click", () => {
  if (!reachedEnd) {
    return;
  }

  confirmButton.disabled = true;

  confirmButton.textContent = "⏳ Подтверждение...";

  status.textContent = "Фиксируем ознакомление с договором...";

  /*
            Отправляем в MAX сообщение от пользователя.

            Важно:
            это работает внутри MAX Mini App.
        */

  if (window.WebApp && typeof window.WebApp.sendData === "function") {
    window.WebApp.sendData("CONTRACT_VIEWED");
  } else {
    status.textContent = "Приложение открыто не внутри MAX.";

    confirmButton.disabled = false;
  }
});

// ======================================================
// Первичная проверка
// ======================================================

checkScroll();
