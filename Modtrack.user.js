// ==UserScript==
// @name         Modtrack
// @namespace    Chr0nX/Dubtrack
// @version      0.1.1
// @description  Mod Helper for NB3's Dubtrack room
// @author       Chr0nX
// @match        https://www.dubtrack.fm/join/nightblue3
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.Modtrack = (function (Dubtrack) {
        var self = {};

        var messages = {
            read_rules: 'Read the rules please! Full list of rules: https://github.com/nightbloo/nightbloo.github.io/wiki/Nightblue3-Community:-Rules ',
            song_rules: {
                off_stream: ':exclamation:RULES for songs (off stream): EDM | Trap | Chill, No NSFW, No ear rape, No Hardstyle, No Nightcore/Nightstep, No AMV, No troll songs, Main language English, No same songs within 4 hours:exclamation:',
                on_stream: ':exclamation:RULES for songs (on stream): No NSFW, No ear rape, No Hardstyle, No Nightcore/Nightstep, No AMV:exclamation:'
            },
            language: 'Please keep the chat in English :) ',
            no_spam: 'Please don\'t spam the chat! :P ',
            props_explained: 'Props can be given to the current DJ via the `!props` command (one per song). They are credited at the end of the song. You can join the occasional roulette and brag with them. :D'
        };

        var fn = (function (parent) {
            var self = {};

            self.chatMessage = function (message, send) {
                var element = $('#chat-txt-message');
                element.val(element.val() + message);
                if (send === true) {
                    $('.pusher-chat-widget-send-btn').click();
                }
                element.focus();
            };

            return self;
        })(self);

        var commands = {
            read_rules: {
                name: 'Read Rules!',
                handler: fn.chatMessage,
                arguments: [messages.read_rules, false]
            },
            song_rules_off_stream: {
                name: 'Song Rules off stream',
                handler: fn.chatMessage,
                arguments: [messages.song_rules.off_stream, true]
            },
            song_rules_on_stream: {
                name: 'Song Rules on stream',
                handler: fn.chatMessage,
                arguments: [messages.song_rules.on_stream, true]
            },
            language: {
                name: 'English Only',
                handler: fn.chatMessage,
                arguments: [messages.language, false]
            },
            spam: {
                name: 'Don\'t Spam',
                handler: fn.chatMessage,
                arguments: [messages.no_spam, false]
            },
            props_explained: {
                name: 'Props explained',
                handler: fn.chatMessage,
                arguments: [messages.props_explained, true]
            },
            props: {
                name: '!props',
                handler: fn.chatMessage,
                arguments: ['!props', true]
            }
        };

        self.executeCommand = function (index) {
            var command = commands[index];
            console.log('executing', index);
            command.handler.apply(self, command.arguments);
        };

        var UI = (function (parent) {
            var self = {};

            self.init = function () {
                $('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/Chr0nX/Modtrack/v0.1/modtrack.css" />');
                var container = $('<div class="modtrack-container"><h2>Modtrack</h2></div>');
                for (var index in commands) {
                    var command = commands[index];
                    container.append('<button type="button" onclick="Modtrack.executeCommand(\'' + index + '\')">' + command.name + '</button>');
                }
                container.appendTo('#main-room .right_section');
            };

            return self;
        })(self);

        function init() {
            UI.init();
        }

        $(document).ready(init);

        return self;
    })(Dubtrack);
})();