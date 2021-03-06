/* This file is part of Jeedom.
*
* Jeedom is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* Jeedom is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
*/

/* This file is part of NextDom.
*
* NextDom is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* NextDom is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with NextDom. If not, see <http://www.gnu.org/licenses/>.
*
* @Support <https://www.nextdom.org>
* @Email   <admin@nextdom.org>
* @Authors/Contributors: Sylvaner, Byackee, cyrilphoenix71, ColonelMoutarde, edgd1er, slobberbone, Astral0, DanoneKiD
*/

 $("#sel_plugin").on('change', function() {
    loadPage('index.php?v=d&p=message&plugin=' + $('#sel_plugin').value());
});

 $("#bt_clearMessage").on('click', function(event) {
    nextdom.message.clear({
        plugin: $('#sel_plugin').value(),
        error: function(error) {
            notify("Erreur", error.message, 'error');
        },
        success: function() {
            $("#table_message tbody").remove();
            refreshMessageNumber();
        }
    });
});

 $('#bt_refreshMessage').on('click', function(event) {
    $('#md_modal').dialog({title: "{{Message NextDom}}"});
    $('#md_modal').load('index.php?v=d&p=message&ajax=1').dialog('open');
});

 $("#table_message").delegate(".removeMessage", 'click', function(event) {
    var tr = $(this).closest('tr');
    nextdom.message.remove({
        id: tr.attr('data-message_id'),
        error: function(error) {
            notify("Erreur", error.message, 'error');
        },
        success: function() {
            tr.remove();
            $("#table_message").trigger("update");
            refreshMessageNumber();
        }
    });
});