# Favoriten-Archiv

Ein Tool, um die eigenen nhentai-Favoriten zu organisieren, anzusehen und zu synchronisieren. Es besteht aus einer einzigen Datei (`index.html`) und läuft auf GitHub Pages.

## Einrichten
1. Tool öffnen, oben auf **🔄 Sync** klicken und einen [nhentai-API-Key](https://nhentai.net/user/settings#apikeys) einfügen.
2. Blockiert der Browser den direkten Zugriff (Hinweis beim Key-Test), das Userscript **[Favoriten-Archiv API-Bridge](https://raw.githubusercontent.com/TheVizce/nh-favoriten/main/userscripts/favoriten-archiv-bridge.user.js)** in Tampermonkey installieren. Es wird für die Cover-Sicherung ebenfalls gebraucht und aktualisiert sich über Tampermonkey automatisch.

## Dateien
- `index.html`: das komplette Tool
- `userscripts/favoriten-archiv-bridge.user.js`: Bridge für API-Anfragen und Cover-Bilder (nur lesende Anfragen, nur auf `thevizce.github.io`)

## Datenschutz
Die Daten liegen nur lokal im Browser (IndexedDB `nh-fav-archiv`), nicht im Repo. Der API-Key liegt nur im localStorage des Browsers. Für Sicherung und Gerätewechsel gibt es Backup und Restore (💾 oben bzw. Menü ⋯).
