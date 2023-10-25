// ==UserScript==
// @name             [GW] NPC info
// @description      Добавляет ссылки на проколы боев и передачу денег на страницу NPC.
// @match            https://www.gwars.io/info.php?id=*
// @updateURL        https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.meta.js
// @downloadURL      https://raw.githubusercontent.com/MyRequiem/comfortablePlayingInGW/master/separatedScripts/PersonalNPCNotifications/personalNPCNotifications.user.js
// @version          0.2
// @author           Respawn
// ==/UserScript==

(function() {
    var nps_name = document.querySelector("#namespan").textContent

    if (nps_name.endsWith("[NPC]")) {
        var nps_id = /info\.php\?id=(\d+)/i.exec(location.href)[1];
        var b = document.querySelectorAll('td.greenbg_red')

        let td = document.createElement('td');
        td.setAttribute('colspan', '2');
        td.setAttribute('width', '100%');
        td.setAttribute('class', 'greenbg_red');
        td.setAttribute('align', 'center');
        td.innerHTML = 'Статистика'

        let td1 = document.createElement('td');
        td1.setAttribute('class', 'greenbrightbg');
        td1.setAttribute('valign', 'top');
        td1.setAttribute('align', 'right');
        td1.innerHTML = '<nobr><a href="/usertransfers.php?id=' + nps_id + '" style="text-decoration:none;">Протокол передач денег и предметов</a> [<a href="/usertransfers.php?id=' + nps_id + '"><b>»</b></a>]&nbsp;&nbsp;</nobr>'
        td1.innerHTML += '<br><a href="/info.warstats.php?id=' + nps_id + '" style="text-decoration:none;">Протоколы боёв</a>  [';
        td1.innerHTML += '<a href="/info.warstats.php?id=' + nps_id + '"><b>»</b></a>]&nbsp;&nbsp;'
        td1.innerHTML += '<br><nobr><a href="/info.ach.php?id=' + nps_id + '" style="text-decoration:none;">Достижения игрока</a> [<a href="/info.ach.php?id=' + nps_id + '"><b>»</b></a>]&nbsp;&nbsp;</nobr>'
        
        let td2 = document.createElement('td');
        td2.setAttribute('class', 'greenbrightbg');
        td2.setAttribute('valign', 'top');
        td2.setAttribute('align', 'left');

        var row = b[3].parentNode.parentNode.insertRow(5);
        row.append(td);
        var row1 = b[3].parentNode.parentNode.insertRow(6);
        row1.append(td1);
        row1.append(td2);
    }
})();
