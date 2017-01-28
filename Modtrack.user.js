// ==UserScript==
// @name         Modtrack
// @namespace    Chr0nX/Dubtrack
// @version      0.2
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
            stream_starting: '*Stream is starting* :nb3hype: Queue songs at your own risk of getting skipped. ~Nightcore/Nightstep and AMVs will be removed from the queue!~',
            stream_ending: '@djs The *stream is ending* now, please stick to ~off stream rules for songs~. The queue will be purged in a few minutes. :bingbad:',
            song_rules: {
                off_stream: '> *RULES for songs (off stream)*: ~EDM | Trap | Chill~, No NSFW, No ear rape, No Hardstyle, ~No Nightcore/Nightstep~, ~No AMVs~, No troll songs, ~Main language English~, ~No same songs within 4 hours~',
                on_stream: '> *RULES for songs (on stream)*: No NSFW, No ear rape, No Hardstyle, ~No Nightcore/Nightstep~, ~No AMVs~'
            },
            read_rules: 'Read the rules please! Full list of rules: https://github.com/nightbloo/nightbloo.github.io/wiki/Nightblue3-Community:-Rules ',
            language: 'Please keep the chat in English. You can PM if you wanna speak another language. :) ',
            no_spam: 'Please don\'t spam the chat! :P ',
            skips_explained: '> We don\'t ask for *skips* in this room. Songs get skipped at a certain ~downvote threshold~ (off stream). Just mute if you don\'t wanna listen to it.',
            props_explained: '> *Props* can be given to the current DJ via the `!props` command (one per song). You can join the occasional roulette and brag with them. :D',
            dubs_explained: '>  You get *Dubs* by playing songs and voting on songs. At 10.000 Dubs you\'ll become Resident DJ in this room. Other than that they show how long/often someone has been here.',
            dubx: '> *DubX* adds some useful features like ~emotes~ and an ~ETA timer~ among others to Dubtrack. You can get it at https://dubx.net/ Installation tutorial: https://github.com/nightbloo/nightbloo.github.io/wiki/DubX%3A-Installing-DubX',
            queue_locked: '> *The queue is locked now*, so ~only Resident DJs and above~ can play songs. It\'s probably locked because Rabia wasn\'t happy with the music quality.',
            sub_sunday: 'It\'s *Sub Sunday* :nb3hype: Queue will be locked as long as Rabia streams.'
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
            Stream: {
                stream_starting: {
                    name: 'Stream starting',
                    handler: fn.chatMessage,
                    arguments: [messages.stream_starting, true]
                },
                stream_ending: {
                    name: 'Stream ending',
                    handler: fn.chatMessage,
                    arguments: [messages.stream_ending, true]
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
                queue_locked: {
                    name: 'Queue locked?',
                    handler: fn.chatMessage,
                    arguments: [messages.queue_locked, true]
                },
                sub_sunday: {
                    name: 'Sub Sunday',
                    handler: fn.chatMessage,
                    arguments: [messages.sub_sunday, true]
                }
            },
            Warnings: {
                read_rules: {
                    name: 'Read Rules!',
                    handler: fn.chatMessage,
                    arguments: [messages.read_rules, false]
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
                }
            },
            Explanations: {
                skips_explained: {
                    name: 'Skips explained',
                    handler: fn.chatMessage,
                    arguments: [messages.skips_explained, true]
                },
                props_explained: {
                    name: 'Props explained',
                    handler: fn.chatMessage,
                    arguments: [messages.props_explained, true]
                },
                dubs_explained: {
                    name: 'Dubs explained',
                    handler: fn.chatMessage,
                    arguments: [messages.dubs_explained, true]
                },
                dubx: {
                    name: 'DubX',
                    handler: fn.chatMessage,
                    arguments: [messages.dubx, true]
                }
            },
            Commands: {
                props: {
                    name: '!props',
                    handler: fn.chatMessage,
                    arguments: ['!props', true]
                },
                history: {
                    name: '!history',
                    handler: fn.chatMessage,
                    arguments: ['!history', true]
                }
            }
        };

        self.executeCommand = function (groupIndex, commandIndex) {
            var command = commands[groupIndex][commandIndex];
            command.handler.apply(self, command.arguments);
        };

        var UI = (function (parent) {
            var self = {};

            self.init = function () {
                $('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/Chr0nX/Modtrack/v0.2/modtrack.css" />');
                var container = $('<div class="modtrack-container"><h2>Modtrack</h2></div>');
                for (var groupIndex in commands) {
                    var commandGroup = commands[groupIndex];
                    container.append('<h3>' + groupIndex + '</h3>');
                    for (var commandIndex in commandGroup) {
                        var command = commandGroup[commandIndex];
                        container.append('<button type="button" onclick="Modtrack.executeCommand(\'' + groupIndex + '\', \'' + commandIndex + '\')">' + command.name + '</button>');
                    }
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