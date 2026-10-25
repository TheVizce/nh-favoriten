# Favoriten-Archiv

Ein Tool, um nhentai-Favoriten zu organisieren und anzuschauen. Es besteht aus einer einzigen Datei und läuft auf GitHub Pages.

## Einrichten
1. Neues Repo anlegen und `index.html` hochladen.
2. Unter **Settings → Pages** „Deploy from branch“, `main` / `root` wählen.
3. `nhentai-favoriten-sync.user.js` in Tampermonkey installieren. Das alte CSV-Skript kann deaktiviert werden.

## Benutzen
- Auf nhentai.net die Favoriten öffnen. Im Panel **🆕 Neue holen** klicken (schnell) oder **🔄 Alles prüfen** (langsam, findet geänderte Tags).
- Die heruntergeladene JSON im Tool über **Import / Update** oder per Drag & Drop einlesen. Danach den Prüf-Dialog bestätigen.
- Alte CSVs aus dem v2.1-Skript lassen sich ebenfalls importieren.

## Datenschutz
Die Daten liegen nur lokal im Browser (IndexedDB), nicht im Repo. Für einen Gerätewechsel gibt es Backup und Restore im Menü ⋯.
