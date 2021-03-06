define("xabber-templates", [
    "underscore",
    "jquery",

    "text!templates/base/dialog.html",
    "text!templates/base/input_widget.html",
    "text!templates/base/toolbar.html",
    "text!templates/base/settings.html",
    "text!templates/base/about.html",

    "text!templates/api_service/xabber_login.html",
    "text!templates/api_service/xabber_account.html",
    "text!templates/api_service/add_xabber_account.html",
    "text!templates/api_service/sync_settings.html",
    "text!templates/api_service/sync_settings_account_item.html",

    "text!templates/accounts/xmpp_login.html",
    "text!templates/accounts/add_account.html",
    "text!templates/accounts/change_password.html",
    "text!templates/accounts/toolbar_item.html",
    "text!templates/accounts/settings_left.html",
    "text!templates/accounts/settings_right.html",
    "text!templates/accounts/resource.html",
    "text!templates/accounts/global_settings_item.html",
    "text!templates/accounts/change_status.html",

    "text!templates/vcard/vcard.html",
    "text!templates/vcard/vcard_edit.html",

    "text!templates/contacts/roster_right.html",
    "text!templates/contacts/roster_left.html",
    "text!templates/contacts/account_roster_right.html",
    "text!templates/contacts/account_roster_left.html",
    "text!templates/contacts/roster_left.html",
    "text!templates/contacts/group_right.html",
    "text!templates/contacts/group_left.html",
    "text!templates/contacts/add_contact.html",
    "text!templates/contacts/contact_right_item.html",
    "text!templates/contacts/contact_left_item.html",
    "text!templates/contacts/contact_blocked_item.html",
    "text!templates/contacts/contact_details.html",
    "text!templates/contacts/roster_settings.html",
    "text!templates/contacts/group_settings.html",
    "text!templates/contacts/groups_checkbox_list.html",
    "text!templates/contacts/add_contact_account_item.html",
    "text!templates/contacts/contact_placeholder.html",

    "text!templates/chats/chats_panel.html",
    "text!templates/chats/chat_item.html",
    "text!templates/chats/chat_head.html",
    "text!templates/chats/chat_content.html",
    "text!templates/chats/chat_bottom.html",
    "text!templates/chats/forward_panel.html",
    "text!templates/chats/chat_placeholder.html",
    "text!templates/chats/group_chat_placeholder.html",
    "text!templates/chats/messages/main.html",
    "text!templates/chats/messages/forwarded.html",
    "text!templates/chats/messages/system.html",
    "text!templates/chats/messages/file_upload.html",
    "text!templates/chats/messages/auth_request.html",

    "text!templates/svg/ic-jabber.html",
    "text!templates/svg/xmpp.html",
    "text!templates/svg/volume-off-variant.html",
    "text!templates/svg/message-group.html",
    "text!templates/svg/xabber-offline.html",
    "text!templates/svg/xabber-online.html"
], function (_, $) {

    _.templateSettings = {
        evaluate : /\{\[([\s\S]+?)\]\}/g,
        interpolate : /\{\{([\s\S]+?)\}\}/g
    };

    var templates = {};

    var insertSvg = function (html) {
        var $html = $('<div/>').html(html);
        $html.find('.mdi-svg-template').each(function () {
            var $el = $(this);
            var svg_name = $el.data('svgname');
            $el.removeClass('mdi-svg-template').addClass('mdi-'+svg_name)
                .attr('data-svgname', null);
            $el.html(templates.svg[svg_name]());
        })
        return $html.html();
    };

    var _addTemplate = function (name, options) {
        options || (options = {});
        var path = name.split('.'),
            tpl = _.template(require('text!templates/'+path.join('/')+'.html')),
            tpl_name = path.pop(),
            res = templates;
        _.each(path, function (attr) {
            res[attr] || (res[attr] = {});
            res = res[attr];
        });
        if (options.is_svg) {
            res[tpl_name] = tpl;
        } else {
            res[tpl_name] = function (data) {
                return insertSvg(tpl(data));
            };
        }
    };

    var addTemplate = function (name) {
        _addTemplate(name, {is_svg: false});
    };

    var addSvgTemplate = function (name) {
        _addTemplate(name, {is_svg: true});
    };


    addTemplate('base.dialog');
    addTemplate('base.input_widget');
    addTemplate('base.toolbar');
    addTemplate('base.settings');
    addTemplate('base.about');

    addTemplate('api_service.xabber_login');
    addTemplate('api_service.add_xabber_account');
    addTemplate('api_service.xabber_account');
    addTemplate('api_service.sync_settings');
    addTemplate('api_service.sync_settings_account_item');

    addTemplate('accounts.xmpp_login');
    addTemplate('accounts.add_account');
    addTemplate('accounts.change_password');
    addTemplate('accounts.toolbar_item');
    addTemplate('accounts.settings_left');
    addTemplate('accounts.settings_right');
    addTemplate('accounts.resource');
    addTemplate('accounts.global_settings_item');
    addTemplate('accounts.change_status');

    addTemplate('vcard.vcard');
    addTemplate('vcard.vcard_edit');

    addTemplate('contacts.roster_right');
    addTemplate('contacts.roster_left');
    addTemplate('contacts.account_roster_right');
    addTemplate('contacts.account_roster_left');
    addTemplate('contacts.group_right');
    addTemplate('contacts.group_left');
    addTemplate('contacts.add_contact');
    addTemplate('contacts.contact_right_item');
    addTemplate('contacts.contact_left_item');
    addTemplate('contacts.contact_blocked_item');
    addTemplate('contacts.contact_details');
    addTemplate('contacts.roster_settings');
    addTemplate('contacts.group_settings');
    addTemplate('contacts.groups_checkbox_list');
    addTemplate('contacts.add_contact_account_item');
    addTemplate('contacts.contact_placeholder');

    addTemplate('chats.chats_panel');
    addTemplate('chats.chat_item');
    addTemplate('chats.chat_head');
    addTemplate('chats.chat_content');
    addTemplate('chats.chat_bottom');
    addTemplate('chats.forward_panel');
    addTemplate('chats.chat_placeholder');
    addTemplate('chats.group_chat_placeholder');
    addTemplate('chats.messages.main');
    addTemplate('chats.messages.forwarded');
    addTemplate('chats.messages.system');
    addTemplate('chats.messages.file_upload');
    addTemplate('chats.messages.auth_request');

    addSvgTemplate('svg.ic-jabber');
    addSvgTemplate('svg.xmpp');
    addSvgTemplate('svg.volume-off-variant');
    addSvgTemplate('svg.message-group');
    addSvgTemplate('svg.xabber-offline');
    addSvgTemplate('svg.xabber-online');

    return templates;
});
