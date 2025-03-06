(()=>{"use strict";var e={660:(e,n,t)=>{t.d(n,{A:()=>d});var o=t(942),r=t.n(o),a=t(278),i=t.n(a)()(r());i.push([e.id,"* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n:root {\n    font-family: sans-serif;\n    --board-border: 1px solid black;\n    --cell-border: var(--board-border);\n    --cell-bg-color: beige;\n    --cell-bg-color-occupied: rgb(94, 87, 87);\n    --cell-bg-color-occupied-attacked: red;\n    --cell-bg-color-non-occupied-attacked: cyan;\n    --cell-bg-color-hover: rgb(206, 206, 181);\n    --cell-bg-color-active: rgb(191, 191, 154);\n    --ship-cell-bg-color-hover: rgb(112, 166, 210);\n    --ship-cell-bg-color-selected: rgb(207, 225, 239);\n    --ship-cell-bg-color-placed: var(--cell-bg-color-occupied);\n    --formation-board-cell-bg-color-hovered: rgb(172, 169, 169);\n    --formation-board-cell-bg-color-hovered-na: rgb(211, 107, 107);\n}\n\nbody {\n    background-color: rgb(66, 72, 78);\n}\n\n.cell {\n    background-color: var(--cell-bg-color);\n    border: var(--cell-border);\n}\n\n.boards {\n    padding-top: 1em;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    gap: 1em;\n}\n\nmain {\n    padding: 1.5em;\n}\n\n.score {\n    font-weight: 600;\n    font-size: 1.2rem;\n    justify-self: center;\n}\n\n.score.player1 {\n    color: rgb(156, 233, 156);\n}\n.score.player2 {\n    color: rgb(223, 119, 119);\n}\n\n.board {\n    display: grid;\n    width: 350px;\n    margin-top: 1em;\n    grid-template-columns: repeat(10, 1fr);\n    height: auto;\n    border: var(--board-border);\n    aspect-ratio: 1;\n    cursor: default;\n}\n\n.board.player1 .cell.occupied {\n    background-color: var(--cell-bg-color-occupied);\n}\n\n:root div.board div.cell.attacked {\n    background-color: var(--cell-bg-color-non-occupied-attacked);\n}\n\ndiv.board div.cell.attacked.occupied {\n    background-color: var(--cell-bg-color-occupied-attacked);\n}\n\ndiv.board.player1 {\n    cursor: not-allowed;\n}\n\n.board.player2 .cell:hover {\n    background-color: var(--cell-bg-color-hover);\n}\n.board.player2 .cell:active {\n    background-color: var(--cell-bg-color-active);\n}\n\ndialog::backdrop {\n    background-color: rgb(0 0 0 / 50%);\n}\n\ndialog.game-over.win {\n    background-color: rgb(158, 230, 173);\n}\ndialog.game-over.loss {\n    background-color: rgb(243, 172, 172);\n}\n\ndialog.game-over {\n    position: absolute;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: auto;\n    margin-bottom: auto;\n    padding: 1em;\n    border-radius: 4px;\n}\n\ndialog.game-over div {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5em;\n}\n\ndialog.game-over div h3 {\n    font-size: 1.75rem;\n    font-weight: 500;\n    font-family: sans-serif;\n    padding: 0px 16px;\n}\n\nbutton.play-again {\n    font-family: sans-serif;\n    align-self: center;\n    padding: 4px 12px;\n    appearance: none;\n    background-color: transparent;\n    border: 1.5px solid black;\n    border-radius: 4px;\n    font-size: 1rem;\n    cursor: pointer;\n}\nbutton.play-again:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\nbutton.play-again:active {\n    background-color: rgba(0, 0, 0, 0.15);\n}\nbutton.play-again:focus {\n    outline: none;\n}\n\ndiv.formation-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    justify-content: center;\n    justify-items: center;\n    gap: 3em;\n}\n\nul.tips {\n    display: grid;\n    text-align: start;\n    justify-items: start;\n    margin-top: 3em;\n    justify-self: end;\n    margin-bottom: 3em;\n}\n\n.tip {\n    color: white;\n    font-weight: 600;\n    line-height: 1.3;\n    margin-bottom: 1.3em;\n    max-width: 35ch;\n}\n\ndiv.ships {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 1em;\n    justify-self: start;\n    align-content: center;\n}\n\ndiv.ships.horizontal {\n    align-content: center;\n    grid-template-columns: 1fr;\n    gap: 1.5em;\n}\n\ndiv.ships.horizontal .ship {\n    display: flex;\n    align-items: center;\n}\n\ndiv.ships.horizontal .ship {\n    justify-self: start;\n}\n\ndiv.ships.horizontal .ship-cell {\n    display: flex;\n    align-items: start;\n    border-bottom: solid black 2px;\n    border-right: none;\n}\ndiv.ships.horizontal .ship-cell:last-child {\n    border-right: solid black 2px;\n}\n\ndiv.ship {\n    align-self: start;\n}\n\ndiv.ship-cell {\n    background-color: steelblue;\n    padding: 16px;\n    border: 2px solid black;\n    border-bottom: none;\n}\n\n.ships:not(:has(.ship.selected)) div.ship:not(.placed):hover .ship-cell {\n    background-color: var(--ship-cell-bg-color-hover);\n}\n\ndiv.ship.selected .ship-cell {\n    background-color: var(--ship-cell-bg-color-selected);\n}\n\ndiv.ship.placed .ship-cell {\n    background-color: var(--cell-bg-color-occupied);\n}\n\ndiv.ship-cell:last-child {\n    border-bottom: 2px solid black;\n}\n\ndiv.formation-container .cell.hover {\n    background-color: var(--formation-board-cell-bg-color-hovered);\n}\n\ndiv.formation-container .cell.hover.na {\n    background-color: var(--formation-board-cell-bg-color-hovered-na);\n}\n\ndiv.formation-container .board .cell.occupied {\n    background-color: var(--cell-bg-color-occupied);\n}\n\nmain {\n    text-align: center;\n}\n\nbutton.confirm {\n    margin-top: 1em;\n    padding: 6px 12px;\n    appearance: none;\n    border: 2px solid black;\n    font-size: 1rem;\n    border-radius: 4px;\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\nbutton.confirm.enabled {\n    opacity: 1;\n    cursor: pointer;\n}\n\nbutton.confirm.enabled:hover {\n    background-color: rgb(219, 219, 219);\n}\nbutton.confirm.enabled:active {\n    background-color: rgb(206, 206, 206);\n}\n\nbutton.x-axis,\nbutton.y-axis,\nbutton.human,\nbutton.ai {\n    appearance: none;\n    border-radius: 4px;\n    padding: 4px 8px;\n    /* margin-bottom: 12px; */\n    cursor: pointer;\n    border: 2px solid black;\n}\n\nbutton.x-axis,\nbutton.human {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\nbutton.y-axis,\nbutton.ai {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-left: none;\n}\n\nbutton.x-axis.selected,\nbutton.y-axis.selected,\nbutton.human.selected,\nbutton.ai.selected {\n    background-color: rgb(154, 203, 243);\n}\n\nbutton.x-axis:not(.selected):hover,\nbutton.y-axis:not(.selected):hover,\nbutton.human:not(.selected):hover,\nbutton.ai:not(.selected):hover {\n    background-color: rgb(204, 210, 217);\n}\n\nbutton.x-axis:not(.selected):active,\nbutton.y-axis:not(.selected):active,\nbutton.human:not(.selected):active,\nbutton.ai:not(.selected):active {\n    background-color: rgb(185, 199, 211);\n}\n\nmain:has(form.player-info) {\n    display: grid;\n    place-content: center;\n    height: 100vh;\n}\n\nform.player-info {\n    display: grid;\n    gap: 1.75em;\n    border: 2px solid white;\n    width: fit-content;\n    margin-left: auto;\n    margin-right: auto;\n    padding: 1em 1.5em;\n    background-color: slategray;\n    border-radius: 6px;\n}\n\nform h3 {\n    color: white;\n}\n\nform button.confirm-form {\n    padding: 6px 8px;\n    appearance: none;\n    cursor: pointer;\n    font-size: 1rem;\n    width: 200px;\n    justify-self: center;\n    border: 2px solid transparent;\n    border-radius: 4px;\n}\n\nform button.confirm-form:hover {\n    background-color: rgb(217, 217, 217);\n}\nform button.confirm-form:active {\n    background-color: rgb(197, 196, 196);\n}\n\nform input {\n    padding: 6px 8px;\n    font-size: 1rem;\n    appearance: none;\n    width: 200px;\n    justify-self: center;\n    border: 2px solid transparent;\n    border-radius: 4px;\n    outline: 1.5px solid rgb(93, 87, 87);\n}\n\nform input:focus {\n    outline: 2px solid black;\n}\n\ndiv.pass-the-device {\n    height: 100vh;\n    display: grid;\n    gap: 4em;\n    justify-items: center;\n}\n\ndiv.pass-the-device h2 {\n    color: white;\n    font-size: 2.5rem;\n    align-self: end;\n    letter-spacing: 1.5px;\n}\n\nmain:has(div.pass-the-device) {\n    padding: 0;\n}\ndiv.pass-the-device button.continue {\n    appearance: none;\n    border: 2px solid black;\n    border-radius: 0.4rem;\n    align-self: start;\n    padding: 0.75rem 1.5rem;\n    font-size: 1.5rem;\n    cursor: pointer;\n}\n\ndiv.pass-the-device button.continue:hover {\n    background-color: rgb(215, 215, 215);\n}\n\ndiv.pass-the-device button.continue:active {\n    background-color: rgb(187, 187, 187);\n}\n","",{version:3,sources:["webpack://./styles.css"],names:[],mappings:"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",sourcesContent:["* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n:root {\n    font-family: sans-serif;\n    --board-border: 1px solid black;\n    --cell-border: var(--board-border);\n    --cell-bg-color: beige;\n    --cell-bg-color-occupied: rgb(94, 87, 87);\n    --cell-bg-color-occupied-attacked: red;\n    --cell-bg-color-non-occupied-attacked: cyan;\n    --cell-bg-color-hover: rgb(206, 206, 181);\n    --cell-bg-color-active: rgb(191, 191, 154);\n    --ship-cell-bg-color-hover: rgb(112, 166, 210);\n    --ship-cell-bg-color-selected: rgb(207, 225, 239);\n    --ship-cell-bg-color-placed: var(--cell-bg-color-occupied);\n    --formation-board-cell-bg-color-hovered: rgb(172, 169, 169);\n    --formation-board-cell-bg-color-hovered-na: rgb(211, 107, 107);\n}\n\nbody {\n    background-color: rgb(66, 72, 78);\n}\n\n.cell {\n    background-color: var(--cell-bg-color);\n    border: var(--cell-border);\n}\n\n.boards {\n    padding-top: 1em;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    justify-items: center;\n    gap: 1em;\n}\n\nmain {\n    padding: 1.5em;\n}\n\n.score {\n    font-weight: 600;\n    font-size: 1.2rem;\n    justify-self: center;\n}\n\n.score.player1 {\n    color: rgb(156, 233, 156);\n}\n.score.player2 {\n    color: rgb(223, 119, 119);\n}\n\n.board {\n    display: grid;\n    width: 350px;\n    margin-top: 1em;\n    grid-template-columns: repeat(10, 1fr);\n    height: auto;\n    border: var(--board-border);\n    aspect-ratio: 1;\n    cursor: default;\n}\n\n.board.player1 .cell.occupied {\n    background-color: var(--cell-bg-color-occupied);\n}\n\n:root div.board div.cell.attacked {\n    background-color: var(--cell-bg-color-non-occupied-attacked);\n}\n\ndiv.board div.cell.attacked.occupied {\n    background-color: var(--cell-bg-color-occupied-attacked);\n}\n\ndiv.board.player1 {\n    cursor: not-allowed;\n}\n\n.board.player2 .cell:hover {\n    background-color: var(--cell-bg-color-hover);\n}\n.board.player2 .cell:active {\n    background-color: var(--cell-bg-color-active);\n}\n\ndialog::backdrop {\n    background-color: rgb(0 0 0 / 50%);\n}\n\ndialog.game-over.win {\n    background-color: rgb(158, 230, 173);\n}\ndialog.game-over.loss {\n    background-color: rgb(243, 172, 172);\n}\n\ndialog.game-over {\n    position: absolute;\n    margin-left: auto;\n    margin-right: auto;\n    margin-top: auto;\n    margin-bottom: auto;\n    padding: 1em;\n    border-radius: 4px;\n}\n\ndialog.game-over div {\n    display: flex;\n    flex-direction: column;\n    gap: 1.5em;\n}\n\ndialog.game-over div h3 {\n    font-size: 1.75rem;\n    font-weight: 500;\n    font-family: sans-serif;\n    padding: 0px 16px;\n}\n\nbutton.play-again {\n    font-family: sans-serif;\n    align-self: center;\n    padding: 4px 12px;\n    appearance: none;\n    background-color: transparent;\n    border: 1.5px solid black;\n    border-radius: 4px;\n    font-size: 1rem;\n    cursor: pointer;\n}\nbutton.play-again:hover {\n    background-color: rgba(0, 0, 0, 0.1);\n}\nbutton.play-again:active {\n    background-color: rgba(0, 0, 0, 0.15);\n}\nbutton.play-again:focus {\n    outline: none;\n}\n\ndiv.formation-container {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    justify-content: center;\n    justify-items: center;\n    gap: 3em;\n}\n\nul.tips {\n    display: grid;\n    text-align: start;\n    justify-items: start;\n    margin-top: 3em;\n    justify-self: end;\n    margin-bottom: 3em;\n}\n\n.tip {\n    color: white;\n    font-weight: 600;\n    line-height: 1.3;\n    margin-bottom: 1.3em;\n    max-width: 35ch;\n}\n\ndiv.ships {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 1em;\n    justify-self: start;\n    align-content: center;\n}\n\ndiv.ships.horizontal {\n    align-content: center;\n    grid-template-columns: 1fr;\n    gap: 1.5em;\n}\n\ndiv.ships.horizontal .ship {\n    display: flex;\n    align-items: center;\n}\n\ndiv.ships.horizontal .ship {\n    justify-self: start;\n}\n\ndiv.ships.horizontal .ship-cell {\n    display: flex;\n    align-items: start;\n    border-bottom: solid black 2px;\n    border-right: none;\n}\ndiv.ships.horizontal .ship-cell:last-child {\n    border-right: solid black 2px;\n}\n\ndiv.ship {\n    align-self: start;\n}\n\ndiv.ship-cell {\n    background-color: steelblue;\n    padding: 16px;\n    border: 2px solid black;\n    border-bottom: none;\n}\n\n.ships:not(:has(.ship.selected)) div.ship:not(.placed):hover .ship-cell {\n    background-color: var(--ship-cell-bg-color-hover);\n}\n\ndiv.ship.selected .ship-cell {\n    background-color: var(--ship-cell-bg-color-selected);\n}\n\ndiv.ship.placed .ship-cell {\n    background-color: var(--cell-bg-color-occupied);\n}\n\ndiv.ship-cell:last-child {\n    border-bottom: 2px solid black;\n}\n\ndiv.formation-container .cell.hover {\n    background-color: var(--formation-board-cell-bg-color-hovered);\n}\n\ndiv.formation-container .cell.hover.na {\n    background-color: var(--formation-board-cell-bg-color-hovered-na);\n}\n\ndiv.formation-container .board .cell.occupied {\n    background-color: var(--cell-bg-color-occupied);\n}\n\nmain {\n    text-align: center;\n}\n\nbutton.confirm {\n    margin-top: 1em;\n    padding: 6px 12px;\n    appearance: none;\n    border: 2px solid black;\n    font-size: 1rem;\n    border-radius: 4px;\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n\nbutton.confirm.enabled {\n    opacity: 1;\n    cursor: pointer;\n}\n\nbutton.confirm.enabled:hover {\n    background-color: rgb(219, 219, 219);\n}\nbutton.confirm.enabled:active {\n    background-color: rgb(206, 206, 206);\n}\n\nbutton.x-axis,\nbutton.y-axis,\nbutton.human,\nbutton.ai {\n    appearance: none;\n    border-radius: 4px;\n    padding: 4px 8px;\n    /* margin-bottom: 12px; */\n    cursor: pointer;\n    border: 2px solid black;\n}\n\nbutton.x-axis,\nbutton.human {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\nbutton.y-axis,\nbutton.ai {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-left: none;\n}\n\nbutton.x-axis.selected,\nbutton.y-axis.selected,\nbutton.human.selected,\nbutton.ai.selected {\n    background-color: rgb(154, 203, 243);\n}\n\nbutton.x-axis:not(.selected):hover,\nbutton.y-axis:not(.selected):hover,\nbutton.human:not(.selected):hover,\nbutton.ai:not(.selected):hover {\n    background-color: rgb(204, 210, 217);\n}\n\nbutton.x-axis:not(.selected):active,\nbutton.y-axis:not(.selected):active,\nbutton.human:not(.selected):active,\nbutton.ai:not(.selected):active {\n    background-color: rgb(185, 199, 211);\n}\n\nmain:has(form.player-info) {\n    display: grid;\n    place-content: center;\n    height: 100vh;\n}\n\nform.player-info {\n    display: grid;\n    gap: 1.75em;\n    border: 2px solid white;\n    width: fit-content;\n    margin-left: auto;\n    margin-right: auto;\n    padding: 1em 1.5em;\n    background-color: slategray;\n    border-radius: 6px;\n}\n\nform h3 {\n    color: white;\n}\n\nform button.confirm-form {\n    padding: 6px 8px;\n    appearance: none;\n    cursor: pointer;\n    font-size: 1rem;\n    width: 200px;\n    justify-self: center;\n    border: 2px solid transparent;\n    border-radius: 4px;\n}\n\nform button.confirm-form:hover {\n    background-color: rgb(217, 217, 217);\n}\nform button.confirm-form:active {\n    background-color: rgb(197, 196, 196);\n}\n\nform input {\n    padding: 6px 8px;\n    font-size: 1rem;\n    appearance: none;\n    width: 200px;\n    justify-self: center;\n    border: 2px solid transparent;\n    border-radius: 4px;\n    outline: 1.5px solid rgb(93, 87, 87);\n}\n\nform input:focus {\n    outline: 2px solid black;\n}\n\ndiv.pass-the-device {\n    height: 100vh;\n    display: grid;\n    gap: 4em;\n    justify-items: center;\n}\n\ndiv.pass-the-device h2 {\n    color: white;\n    font-size: 2.5rem;\n    align-self: end;\n    letter-spacing: 1.5px;\n}\n\nmain:has(div.pass-the-device) {\n    padding: 0;\n}\ndiv.pass-the-device button.continue {\n    appearance: none;\n    border: 2px solid black;\n    border-radius: 0.4rem;\n    align-self: start;\n    padding: 0.75rem 1.5rem;\n    font-size: 1.5rem;\n    cursor: pointer;\n}\n\ndiv.pass-the-device button.continue:hover {\n    background-color: rgb(215, 215, 215);\n}\n\ndiv.pass-the-device button.continue:active {\n    background-color: rgb(187, 187, 187);\n}\n"],sourceRoot:""}]);const d=i},278:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var d=0;d<this.length;d++){var l=this[d][0];null!=l&&(i[l]=!0)}for(var c=0;c<e.length;c++){var s=[].concat(e[c]);o&&i[s[0]]||(void 0!==a&&(void 0===s[5]||(s[1]="@layer".concat(s[5].length>0?" ".concat(s[5]):""," {").concat(s[1],"}")),s[5]=a),t&&(s[2]?(s[1]="@media ".concat(s[2]," {").concat(s[1],"}"),s[2]=t):s[2]=t),r&&(s[4]?(s[1]="@supports (".concat(s[4],") {").concat(s[1],"}"),s[4]=r):s[4]="".concat(r)),n.push(s))}},n}},942:e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),a="/*# ".concat(r," */");return[n].concat([a]).join("\n")}return[n].join("\n")}},292:e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var a={},i=[],d=0;d<e.length;d++){var l=e[d],c=o.base?l[0]+o.base:l[0],s=a[c]||0,A="".concat(c," ").concat(s);a[c]=s+1;var p=t(A),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)n[p].references++,n[p].updater(u);else{var g=r(u,o);o.byIndex=d,n.splice(d,0,{identifier:A,updater:g,references:1})}i.push(A)}return i}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var d=t(a[i]);n[d].references--}for(var l=o(e,r),c=0;c<a.length;c++){var s=t(a[c]);0===n[s].references&&(n[s].updater(),n.splice(s,1))}a=l}}},383:e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},88:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},884:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},893:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},997:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,exports:{}};return e[o](a,a.exports,t),a.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0;class o{length;#e=0;get hits(){return this.#e}constructor(e){this.length=e}hit(){this.#e+=1}isSunk(){return this.#e>=this.length}}class r{gridSize;board;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;this.gridSize=e,this.board=new Array(e);for(let n=0;n<e;n++){this.board[n]=new Array(e);for(let t=0;t<e;t++)this.board[n][t]={ship:null,shipID:null,attacked:!1}}}placeShipHorizontally(e,n,t){if(n>=this.gridSize||t>=this.gridSize)throw new Error("coordinate should be inside the board");if(n+e.length-1>=this.gridSize||t>=this.gridSize)throw new Error("ship is too large for the board");for(let o=0;o<e.length;o++)if(null!==this.board[t][n+o].ship)return!1;for(let o=0;o<e.length;o++)this.board[t][n+o].ship=e,this.board[t][n+o].shipID=`${n}${t}`;return!0}placeShipVertically(e,n,t){if(n>=this.gridSize||t>=this.gridSize)throw new Error("coordinate should be inside the board");if(n>=this.gridSize||t+e.length-1>=this.gridSize)throw new Error("ship is too large for the board");for(let o=0;o<e.length;o++)if(null!==this.board[t+o][n].ship)return!1;for(let o=0;o<e.length;o++)this.board[t+o][n].ship=e,this.board[t+o][n].shipID=`${n}${t}`;return!0}receiveAttack(e,n){if(e>=this.gridSize||n>=this.gridSize)throw new Error("coordinate should be inside the board");return!this.board[n][e].attacked&&(this.board[n][e].attacked=!0,null!==this.board[n][e].ship&&this.board[n][e].ship.hit(),!0)}#n(){const e=[];for(let n=0;n<this.gridSize;n++)for(let t=0;t<this.gridSize;t++){const{ship:o}=this.board[n][t];null!==o&&(e.includes(o)||e.push(o))}return e}areAllShipsSunk(){const e=this.#n();for(let n=0;n<e.length;n++)if(!e[n].isSunk())return!1;return!0}populate(){const e=[new o(2),new o(3),new o(3),new o(4),new o(5)];for(;e.length>0;){const n=Math.floor(Math.random()*this.gridSize),t=Math.floor(Math.random()*this.gridSize),o=Math.random()>.5;this.isPossibleToPlaceShip(n,t,e[0].length,o)&&(o?this.placeShipHorizontally(e.shift(),n,t):this.placeShipVertically(e.shift(),n,t))}}findCellsOccupiedByShipInCell(e,n){if(e>=this.gridSize||e<0||n>=this.gridSize||n<0)throw new Error("coordinate should be inside the board");const t=this.board[n][e].shipID;if(null===t)return[];const o=[];for(let e=0;e<this.gridSize;e++)for(let n=0;n<this.gridSize;n++){const{shipID:r}=this.board[e][n];r===t&&o.push({x:n,y:e})}return o}resetBoard(){for(let e=0;e<this.gridSize;e++)for(let n=0;n<this.gridSize;n++)this.board[e][n]={ship:null,shipID:null,attacked:!1}}isCellInsideBoard(e,n){const t=e<this.gridSize&&e>=0,o=n<this.gridSize&&n>=0;return t&&o}isPossibleToPlaceShip(e,n,t,o){const a=r.findCellsAffectedByShipIfLaid(e,n,t,o);for(let e=0;e<a.length;e++){const n=a[e];if(!this.isCellInsideBoard(n.x,n.y))return!1;if(null!==this.board[n.y][n.x].ship)return!1}return!0}static findCellsAffectedByShipIfLaid(e,n,t,o){const r=[];for(let a=0;a<t;a++)o?r.push({x:e+a,y:n}):r.push({x:e,y:n+a});return r}}class a{gameBoard;score;name;constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Player";this.gameBoard=new r(10),this.score=0,this.name=e}}class i extends a{#t=[];constructor(){super(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"AI");for(let e=0;e<this.gameBoard.gridSize;e++){this.#t.push(new Array(this.gameBoard.gridSize));for(let n=0;n<this.gameBoard.gridSize;n++)this.#t[e][n]=!1}}getNextAttack(){let e=!0;const{gridSize:n}=this.gameBoard;for(let t=0;t<n;t++)for(let o=0;o<n;o++)this.#t[t][o]||(e=!1);if(e)return null;let t=Math.floor(Math.random()*n),o=Math.floor(Math.random()*n);for(;this.#t[o][t];)t=Math.floor(Math.random()*n),o=Math.floor(Math.random()*n);return this.#t[o][t]=!0,{x:t,y:o}}}const d=function(){function e(e,n){const t=document.querySelector("div.board."+(n?"player1":"player2"));t.innerHTML="";for(let n=0;n<e.length;n++)for(let o=0;o<e.length;o++){const{ship:r,attacked:a}=e[n][o],i=document.createElement("div");i.classList.add("cell"),i.dataset.x=o,i.dataset.y=n,null!==r&&i.classList.add("occupied"),a&&i.classList.add("attacked"),t.appendChild(i)}}function n(n){e(n,!0)}function t(n){e(n,!1)}return{renderPlayer1Board:n,renderPlayer2Board:t,loadMainScreen:function(e,o,r){const a=document.querySelector("main");a.innerHTML&&(a.innerHTML="");const i=document.createElement("div");i.classList.add("boards");const d=document.createElement("div");d.classList.add("board","player1");const l=document.createElement("div");l.classList.add("board","player2");const c=document.createElement("p");c.innerText=`Your score: ${e.score}`,c.classList.add("score","player1");const s=document.createElement("p");s.innerText=`Enemy's score: ${o.score}`,s.classList.add("score","player2"),i.appendChild(c),i.appendChild(s),i.appendChild(d),i.appendChild(l),a.appendChild(i),n(e.gameBoard.board),t(o.gameBoard.board),r()},loadGameOverDialog:function(e,n){const t=document.createElement("dialog");t.classList.add("game-over");const o=document.createElement("div"),r=document.createElement("h3");r.innerText=e;const a=document.createElement("button");a.classList.add("play-again"),a.innerText="Play Again",o.appendChild(r),o.appendChild(a),t.appendChild(o),document.querySelector("main").appendChild(t),t.showModal(),n()},loadFormationScreen:function(e,n){const t=document.querySelector("main");t.innerHTML&&(t.innerHTML="");const o=document.createElement("div");o.classList.add("formation-container");const r=document.createElement("ul");r.classList.add("tips");const a=document.createElement("li");a.classList.add("tip"),a.innerText="Click on a ship to select it and then choose a cell on the grid to place it.";const i=document.createElement("li");i.classList.add("tip"),i.innerText="Alternatively, you can drag a ship and then drop it on the board.";const d=document.createElement("li");d.classList.add("tip"),d.innerText="Click on the axis buttons to change the direction in which you ship is going to be placed.";const l=document.createElement("li");l.classList.add("tip"),l.innerText='Alternatively, you can press "R" on you keyboard to toggle between the two axis.';const c=document.createElement("li");c.classList.add("tip"),c.innerText="Once you have placed all of your five ships, you can click confirm to save it.",r.appendChild(a),r.appendChild(i),r.appendChild(d),r.appendChild(l),r.appendChild(c),o.appendChild(r);const s=document.createElement("div"),A=document.createElement("div");s.classList.add("board");for(let n=0;n<e;n++)for(let t=0;t<e;t++){const e=document.createElement("div");e.classList.add("cell"),e.dataset.x=t,e.dataset.y=n,s.appendChild(e)}const p=document.createElement("div");p.classList.add("axis");const u=document.createElement("button");u.classList.add("x-axis"),u.innerText="X-Axis";const g=document.createElement("button");g.classList.add("y-axis","selected"),g.innerText="Y-Axis",p.appendChild(u),p.appendChild(g),A.appendChild(p),A.appendChild(s);const h=document.createElement("button");h.classList.add("confirm"),h.innerText="Confirm",A.appendChild(h),o.appendChild(A);const b=document.createElement("div");b.classList.add("ships");const m=document.createElement("div");m.classList.add("ship"),m.dataset.length=2;const C=document.createElement("div");C.classList.add("ship"),C.setAttribute("draggable","true"),C.dataset.length=2;const f=document.createElement("div");f.classList.add("ship"),f.setAttribute("draggable","true"),f.dataset.length=3;const B=document.createElement("div");B.classList.add("ship"),B.setAttribute("draggable","true"),B.dataset.length=3;const v=document.createElement("div");v.classList.add("ship"),v.setAttribute("draggable","true"),v.dataset.length=4;const I=document.createElement("div");I.classList.add("ship"),I.setAttribute("draggable","true"),I.dataset.length=5;const y=document.createElement("div");y.classList.add("ship-cell");for(let e=0;e<2;e++)y.dataset.i=e,C.appendChild(y.cloneNode(!0));for(let e=0;e<3;e++)y.dataset.i=e,f.appendChild(y.cloneNode(!0)),B.appendChild(y.cloneNode(!0));for(let e=0;e<4;e++)y.dataset.i=e,v.appendChild(y.cloneNode(!0));for(let e=0;e<5;e++)y.dataset.i=e,I.appendChild(y.cloneNode(!0));b.appendChild(I),b.appendChild(v),b.appendChild(B),b.appendChild(f),b.appendChild(C),o.appendChild(b),t.appendChild(o),n()},renderFormationBoard:function(e){const n=document.querySelector(".formation-container .board");n.innerHTML="";for(let t=0;t<e.length;t++)for(let o=0;o<e.length;o++){const{ship:r}=e[t][o],a=document.createElement("div");a.classList.add("cell"),a.dataset.x=o,a.dataset.y=t,null!==r&&a.classList.add("occupied"),n.appendChild(a)}},loadPlayerInfoScreen:function(e,n,t){const o=document.querySelector("main");o.innerHTML&&(o.innerHTML="");const r=document.createElement("form");r.classList.add("player-info");const a=document.createElement("h3");a.innerText=`Enter ${e?"first player":"second player"}'s info`;const i=document.createElement("input");if(i.id="player-name",i.required=!0,i.placeholder="Name",i.value=e?"Player1":"Player2",r.appendChild(a),n){const e=document.createElement("div");e.classList.add("player-types");const n=document.createElement("button");n.type="button",n.classList.add("human","selected"),n.innerText="Human";const t=document.createElement("button");t.type="button",t.classList.add("ai"),t.innerText="Computer",e.appendChild(n),e.appendChild(t),r.appendChild(e)}r.appendChild(i);const d=document.createElement("button");d.classList.add("confirm-form"),d.innerText="Next",r.appendChild(d),o.appendChild(r),t()},loadPassTheDeviceScreen:function(e){const n=document.querySelector("main");n.innerHTML&&(n.innerHTML="");const t=document.createElement("h2");t.innerText="Pass The Device!";const o=document.createElement("div");o.classList.add("pass-the-device");const r=document.createElement("button");r.type="button",r.innerText="Continue",r.classList.add("continue"),o.appendChild(t),o.appendChild(r),n.appendChild(o),e()}}}();var l=t(292),c=t.n(l),s=t(893),A=t.n(s),p=t(383),u=t.n(p),g=t(884),h=t.n(g),b=t(88),m=t.n(b),C=t(997),f=t.n(C),B=t(660),v={};v.styleTagTransform=f(),v.setAttributes=h(),v.insert=u().bind(null,"head"),v.domAPI=A(),v.insertStyleElement=m(),c()(B.A,v),B.A&&B.A.locals&&B.A.locals;let I=1,y=null,x=null;function k(){const e=document.querySelector("dialog.game-over");e.querySelector("button").addEventListener("click",(()=>{e.close(),y.gameBoard.resetBoard(),x.gameBoard.resetBoard(),d.loadFormationScreen(y.gameBoard.gridSize,(()=>L(!0)))}))}function E(){const e=()=>{I=1,x.score++,d.loadGameOverDialog("You won!",(()=>{const e=document.querySelector("dialog.game-over");e.classList.add("loss"),e.classList.remove("win"),k()}))};document.querySelector(".board.player1").classList.add("revealed"),document.querySelector(".board.player2").addEventListener("click",(n=>{if([...n.target.classList].includes("cell")){const t=+n.target.dataset.x,o=+n.target.dataset.y;1===I?x.gameBoard.receiveAttack(t,o)&&(d.renderPlayer2Board(x.gameBoard.board),x.gameBoard.areAllShipsSunk()?(()=>{y.score++;const e=x instanceof i?"You won!":`${y.name} beat ${x.name}`;d.loadGameOverDialog(e,(()=>{const e=document.querySelector("dialog.game-over");x instanceof i&&(e.classList.remove("loss"),e.classList.add("win")),k()}))})():(I=2,x instanceof i?new Promise((e=>{setTimeout(e,500)})).then((()=>{const{x:n,y:t}=x.getNextAttack();y.gameBoard.receiveAttack(n,t),d.renderPlayer1Board(y.gameBoard.board),y.gameBoard.areAllShipsSunk()?e():I=1})):d.loadPassTheDeviceScreen(w))):y.gameBoard.receiveAttack(t,o)&&(d.renderPlayer2Board(y.gameBoard.board),y.gameBoard.areAllShipsSunk()?e():(I=1,d.loadPassTheDeviceScreen(w)))}}))}function L(e){const n=e?y:x;let t=0,a=!1,l=0,c=null;const s=document.querySelector(".formation-container .board"),A=()=>{s.childNodes.forEach((e=>{e.classList.remove("hover"),e.classList.remove("na")}))},p=document.querySelector(".ships");p.addEventListener("mouseover",(e=>{c=e.target.classList.contains("ship-cell")?e.target:null}));const u=document.querySelectorAll(".ship");u.forEach((e=>{e.addEventListener("click",(()=>{e.classList.contains("placed")||(p.classList.contains("placing")?e.classList.contains("selected")?(e.classList.remove("selected"),t=0,p.classList.remove("placing")):(u.forEach((e=>{e.classList.remove("selected")})),e.classList.add("selected"),t=+e.dataset.length):(e.classList.add("selected"),t=+e.dataset.length,p.classList.add("placing")))})),e.addEventListener("dragstart",(n=>{0!==t||e.classList.contains("placed")?n.preventDefault():(e.classList.add("selected"),t=+e.dataset.length,c=+c.dataset.i)})),e.addEventListener("dragend",(()=>{e.classList.remove("selected"),t=0,A()}))}));const g=document.querySelector("button.confirm");g.addEventListener("click",(()=>{5===l&&(e?null===x?d.loadPlayerInfoScreen(!1,!0,S):x instanceof i?(x.gameBoard.populate(),d.loadMainScreen(y,x,E)):d.loadFormationScreen(x.gameBoard.gridSize,(()=>L(!1))):d.loadMainScreen(y,x,E))}));const h=(e,r)=>{if(n.gameBoard.isPossibleToPlaceShip(e,r,t,a)){const i=new o(t);a?n.gameBoard.placeShipHorizontally(i,e,r):n.gameBoard.placeShipVertically(i,e,r);const c=p.querySelector(".ship.selected");c.classList.remove("selected"),c.classList.add("placed"),l++,5===l&&g.classList.add("enabled"),t=0,d.renderFormationBoard(n.gameBoard.board)}},b=document.querySelector("button.x-axis"),m=document.querySelector("button.y-axis");b.addEventListener("click",(()=>{a=!0,p.classList.add("horizontal"),b.classList.add("selected"),m.classList.remove("selected")})),m.addEventListener("click",(()=>{a=!1,p.classList.remove("horizontal"),m.classList.add("selected"),b.classList.remove("selected")}));const C=(e,o)=>{const i=r.findCellsAffectedByShipIfLaid(e,o,t,a),d=n.gameBoard.isPossibleToPlaceShip(e,o,t,a);i.forEach((e=>{if(n.gameBoard.isCellInsideBoard(e.x,e.y)){const n=document.querySelector(`[data-x="${e.x}"][data-y="${e.y}"]`);d?n.classList.add("hover"):n.classList.add("hover","na")}}))};s.addEventListener("mouseover",(e=>{if(e.target.classList.contains("cell")){s.childNodes.forEach((e=>{e.classList.remove("hover"),e.classList.remove("na")}));const n=+e.target.dataset.x,t=+e.target.dataset.y;C(n,t)}})),s.addEventListener("mouseleave",(()=>{A()})),s.addEventListener("click",(e=>{if(e.target.classList.contains("cell")&&t>0){const n=+e.target.dataset.x,t=+e.target.dataset.y;h(n,t)}})),s.addEventListener("dragover",(e=>{const n=e.target;e.preventDefault(),A();const t=+n.dataset.x,o=+n.dataset.y;a?C(t-c,o):C(t,o-c)})),s.addEventListener("drop",(e=>{const n=e.target;e.preventDefault(),A();const o=+n.dataset.x,r=+n.dataset.y;a?(h(o-c,r),t=0):(h(o,r-c),t=0)})),s.addEventListener("dragleave",(()=>{A()})),document.body.addEventListener("keyup",(e=>{if(document.body.querySelector(".formation-container")&&"r"===e.key.toLowerCase()){const e=document.querySelector(".cell.hover");if(a=!a,p.classList.toggle("horizontal"),b.classList.toggle("selected"),m.classList.toggle("selected"),e){const n=+e.dataset.x,t=+e.dataset.y;A(),C(n,t)}}}))}function S(){const e=document.querySelector("#player-name"),n=document.querySelector("form button.confirm-form");let t=!0;const o=document.querySelector("button.human"),r=document.querySelector("button.ai");o&&o.addEventListener("click",(()=>{t=!0,o.classList.add("selected"),r.classList.remove("selected")})),r&&r.addEventListener("click",(()=>{t=!1,o.classList.remove("selected"),r.classList.add("selected")})),n.addEventListener("click",(n=>{if(n.preventDefault(),e.reportValidity()){const n=e.value;null===y?(y=new a(n),d.loadFormationScreen(y.gameBoard.gridSize,(()=>L(!0)))):t?(x=new a(n),d.loadFormationScreen(x.gameBoard.gridSize,(()=>L(!1)))):(x=new i(n),x.gameBoard.populate(),d.loadMainScreen(y,x,E))}}))}function w(){document.querySelector("button.continue").addEventListener("click",(()=>{1===I?d.loadMainScreen(y,x,E):d.loadMainScreen(x,y,E)}))}d.loadPlayerInfoScreen(!0,!1,S)})();
//# sourceMappingURL=main.js.map