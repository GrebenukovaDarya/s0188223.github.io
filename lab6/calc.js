function updatePrice() {
    let price = 0;
    let prices = getPrices();
    let checkDiv = document.getElementById("checkboxes");
    let selectDiv = document.getElementById("goods_options");

    let radios = document.getElementsByName("goods");
    radios.forEach(function (radio) {
        if (radio.checked) {
            price = prices.g_Types[radio.value];
            //checkbox
            if (
                radio.value === "g_1" ||
                radio.value === "g_2" ||
                radio.value === "g_5"
            ) {
                checkDiv.style.display = "none";
            } else {
                checkDiv.style.display = "block";
            }
            //select
            if (radio.value === "g_1" || radio.value === "g_3") {
                selectDiv.style.display = "none";
            } else {
                selectDiv.style.display = "block";
            }
        }
    });

    // Смотрим какая товарная опция выбрана.
    let s = document.getElementsByName("g_options");
    let select = s[0].value;
    if (select !== undefined) {
        price += prices.g_Options[select];
    }

    //смотрим какие товарные свойства выбраны
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            let g_Price = prices.g_Properties[checkbox.name];
            if (g_Price !== undefined) {
                price += g_Price;
            }
        }
    });

    let res = document.getElementById("result");

    //подсчет цены с учетом количества товара
    let g_amount = document.getElementsByName("amount");
    let m = g_amount[0].value.match(/^\d+$/);
    if (m !== null) {
        price *= m;
        res.innerHTML = "Итоговая стоимость: " + price;
    } else {
        res.innerHTML = "Данные введены некорректно";
    }
}

function getPrices() {
    return {
        g_Options: {
            option_1: 0,
            option_2: 10,
            option_3: 5
        },
        g_Properties: {
            property_1: 10,
            property_2: 2,
            property_3: 3
        },
        g_Types: {
            g_1: 30,
            g_2: 50,
            g_3: 189,
            g_4: 95,
            g_5: 60
        }
    };
}


window.addEventListener("DOMContentLoaded", function () {
    // Назначаем обработчик радиокнопок
    let radios = document.getElementsByName("goods");
    radios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            updatePrice();
        });
    });

    // Находим select по имени в DOM.
    let sel = document.getElementsByName("g_options");
    let select = sel[0];
    // Назначаем обработчик на изменение select
    select.addEventListener("change", function () {
        updatePrice();
    });

    // Назначаем обработчик чекбоксов
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            updatePrice();
        });
    });

    let am = document.getElementsByName("amount");
    let g_am = am[0];
    // Назначаем обработчик на изменение select
    g_am.addEventListener("change", function () {
        updatePrice();
    });

    updatePrice();
});