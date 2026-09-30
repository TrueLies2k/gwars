// ==UserScript==
// @name             [GW] NPC info
// @description      Добавляет ссылки на проколы боев и передачу денег на страницу NPC.
// @updateURL        https://raw.githubusercontent.com/TrueLies2k/gwars/main/%5BGW%5D%20NPC%20info.user.js
// @downloadURL      https://raw.githubusercontent.com/TrueLies2k/gwars/main/%5BGW%5D%20NPC%20info.user.js
// @match            https://www.gwars.io/info.php?id=*
// @version          0.3
// @author           Respawn
// ==/UserScript==

(function() {
    const npsName = document.querySelector("#namespan").textContent;

    if (npsName.endsWith("[NPC]")) {
        const npsId = /info\.php\?id=(\d+)/i.exec(location.href)[1];
        const greenBgRedCells = document.querySelectorAll('td.greenbg_red');

        // Создаем элементы таблицы
        const createTableCell = (content, attributes) => {
            const td = document.createElement('td');
            Object.entries(attributes).forEach(([key, value]) => td.setAttribute(key, value));
            td.innerHTML = content;
            return td;
        };

        const td = createTableCell('Статистика', {
            colspan: '2',
            width: '100%',
            class: 'greenbg_red',
            align: 'center'
        });

        const td1 = createTableCell(`
            <nobr>
                <a href="/usertransfers.php?id=${npsId}" style="text-decoration:none;">Протокол передач денег и предметов</a>
                [<a href="/usertransfers.php?id=${npsId}"><b>»</b></a>]&nbsp;&nbsp;
            </nobr>
            <br>
            <a href="/info.warstats.php?id=${npsId}" style="text-decoration:none;">Протоколы боёв</a>
            [<a href="/info.warstats.php?id=${npsId}"><b>»</b></a>]&nbsp;&nbsp;
            <br>
            <nobr>
                <a href="/info.ach.php?id=${npsId}" style="text-decoration:none;">Достижения игрока</a>
                [<a href="/info.ach.php?id=${npsId}"><b>»</b></a>]&nbsp;&nbsp;
            </nobr>
        `, {
            class: 'greenbrightbg',
            valign: 'top',
            align: 'right'
        });

        const td2 = createTableCell('', {
            class: 'greenbrightbg',
            valign: 'top',
            align: 'left'
        });

        // Вставляем строки в таблицу
        const tableRow = greenBgRedCells[3].closest('tr').parentNode;
        tableRow.insertRow(5).append(td);
        tableRow.insertRow(6).append(td1, td2);
    }
})();
