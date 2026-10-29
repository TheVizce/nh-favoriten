// ==UserScript==
// @name         Favoriten-Archiv API-Bridge
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  Leitet API-Anfragen des Favoriten-Archivs an die nhentai-API v2 weiter (umgeht die CORS-Sperre des Browsers) und lädt Cover-Bilder für die lokale Sicherung. Nur GET, nur lesende Endpunkte.
// @author       Mudkip
// @match        https://thevizce.github.io/*
// @grant        GM_xmlhttpRequest
// @connect      nhentai.net
// @run-at       document-start
// @homepageURL  https://github.com/TheVizce/nh-favoriten
// @updateURL    https://raw.githubusercontent.com/TheVizce/nh-favoriten/main/userscripts/favoriten-archiv-bridge.user.js
// @downloadURL  https://raw.githubusercontent.com/TheVizce/nh-favoriten/main/userscripts/favoriten-archiv-bridge.user.js
// ==/UserScript==

(function () {
    'use strict';
    const UA = 'FavoritenArchiv/1.0 (+https://thevizce.github.io)';
    // Nur diese lesenden Endpunkte werden weitergeleitet
    const ALLOWED = /^https:\/\/nhentai\.net\/api\/v2\/(favorites|galleries\/\d+(?:\/favorite)?|tags\/ids|cdn|config|user)(\?|$)/;
    // Nur Cover-/Thumbnail-Bilder der nhentai-Bildserver
    const ALLOWED_IMG = /^https:\/\/t\d*\.nhentai\.net\/galleries\/\d+\/(thumb|cover)\.[a-z.]+$/;
    const send = m => window.postMessage(m, '*');

    window.addEventListener('message', e => {
        const d = e.data;
        if (!d || typeof d !== 'object' || e.origin !== location.origin) return;
        if (d.nhb === 'ping') return send({ nhb: 'hello', v: 4.3 });
        if (d.nhb === 'bin') {
            if (typeof d.url !== 'string' || !ALLOWED_IMG.test(d.url)) return send({ nhb: 'res', id: d.id, status: 0, body: 'blocked' });
            return GM_xmlhttpRequest({
                method: 'GET', url: d.url, responseType: 'arraybuffer', anonymous: true, timeout: 30000,
                headers: { 'User-Agent': UA },
                onload: r => {
                    const ct = (r.responseHeaders || '').match(/^content-type:\s*([^;\r\n]+)/im);
                    const buf = r.response instanceof ArrayBuffer ? r.response : null;
                    send({ nhb: 'res', id: d.id, status: r.status, buf, type: ct ? ct[1].trim() : '' });
                },
                onerror: () => send({ nhb: 'res', id: d.id, status: 0, body: 'network' }),
                ontimeout: () => send({ nhb: 'res', id: d.id, status: 0, body: 'timeout' })
            });
        }
        if (d.nhb !== 'req') return;
        if (typeof d.url !== 'string' || !ALLOWED.test(d.url)) return send({ nhb: 'res', id: d.id, status: 0, body: 'blocked' });

        const headers = { 'User-Agent': UA, 'Accept': 'application/json' };
        if (d.headers && typeof d.headers.Authorization === 'string') headers.Authorization = d.headers.Authorization;

        GM_xmlhttpRequest({
            method: 'GET', url: d.url, headers, anonymous: true, timeout: 30000,
            onload: r => {
                const ra = (r.responseHeaders || '').match(/^retry-after:\s*(\S+)/im);
                send({ nhb: 'res', id: d.id, status: r.status, body: r.responseText, retryAfter: ra ? ra[1] : null });
            },
            onerror: () => send({ nhb: 'res', id: d.id, status: 0, body: 'network' }),
            ontimeout: () => send({ nhb: 'res', id: d.id, status: 0, body: 'timeout' })
        });
    });

    send({ nhb: 'hello', v: 4.3 });
})();
