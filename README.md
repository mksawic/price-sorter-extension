# Sortownik Cen (Price Sorter)

**English:** Chrome extension that sorts product listings by price on Allegro and OLX, skipping promoted placements when the site’s own “sort by price” is active.

Rozszerzenie Chrome (Manifest V3), które pomaga trzymać listę ofert posortowaną po cenie — z uwzględnieniem ograniczeń stron (m.in. promowane pozycje). Działa na **Allegro** i **OLX** (wyłącznie domeny wymienione w manifeście).

## Instalacja (Chrome Web Store)

Zainstaluj Sortownik Cen w **[Chrome Web Store](https://chromewebstore.google.com/detail/price-sorter-extension/bckodaoecfggjflhkceocgfhfmkcajkg)**

## Funkcje

- Sortowanie listingu po cenie z pominięciem promowanych ofert (w ramach obsługiwanych serwisów).
- Popup ze statusem działania na Allegro i OLX.
- Lokalizacja: polski (domyślny) i angielski interfejs rozszerzenia.

## Obsługiwane strony

| Serwis  | Domeny                       |
| ------- | ---------------------------- |
| Allegro | `allegro.pl`, `*.allegro.pl` |
| OLX     | `olx.pl`, `*.olx.pl`         |

## Uprawnienia (manifest)

| Uprawnienie        | Po co                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `webNavigation`    | Wykrywanie zmian adresu w aplikacjach SPA (np. nawigacja bez pełnego przeładowania), aby ponownie uruchomić sortowanie. |
| `storage`          | Zapis krótkotrwałego statusu (sesja) dla każdego hosta — czy sortowanie jest aktywne.                                   |
| `host_permissions` | Tylko hosty Allegro i OLX — skrypty treści i logika rozszerzenia.                                                       |

Dane **nie są** wysyłane na zewnętrzne serwery; szczegóły: [Polityka prywatności](PRIVACY.md).

## Wymagania

- [Node.js](https://nodejs.org/) (LTS)
- Google Chrome (do wczytania rozszerzenia w trybie deweloperskim)

## Instalacja z kodu (tryb deweloperski)

1. Sklonuj repozytorium i zainstaluj zależności:

   ```bash
   npm ci
   ```

2. Zbuduj rozszerzenie (wynik w katalogu `dist/`):

   ```bash
   npm run build
   ```

3. W Chrome otwórz `chrome://extensions`, włącz **Tryb deweloperski**, kliknij **Załaduj rozpakowane** i wskaż katalog **`dist/`** (nie katalog `src/`).

## Rozwój

- `npm run dev` — budowanie w trybie watch (esbuild + kopiowanie `public/` do `dist/`).
- `npm run type-check` — sprawdzenie typów TypeScript bez emitowania plików.

## Pakiet pod Chrome Web Store (ZIP)

```bash
npm run package
```

Powstanie plik `price-sorter-extension.zip` w katalogu głównym projektu (do wgrania w [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)). Szczegóły i checklista zrzutów ekranu: [docs/store-listing.md](docs/store-listing.md).

## Struktura repozytorium

```
├── public/          # manifest, ikony, _locales, popup.html — kopiowane do dist/
├── scripts/         # build i pakowanie ZIP
├── src/
│   ├── allegro/     # logika Allegro
│   ├── olx/         # logika OLX
│   ├── shared/      # typy, storage, observer, komunikaty
│   ├── background.ts
│   ├── index.ts     # content script (entry)
│   └── popup.ts
├── dist/            # wynik buildu (nie commituj — generowany lokalnie)
├── PRIVACY.md       # polityka prywatności (treść do Store / GitHub)
└── docs/            # strona HTML pod GitHub Pages + notatki Store
```

## Licencja

Projekt jest udostępniony na licencji MIT — zobacz plik [LICENSE](LICENSE).

## Bezpieczeństwo

Zgłaszanie luk: [SECURITY.md](SECURITY.md).

## Changelog

[Wersje i zmiany](CHANGELOG.md).

## Wsparcie

Możesz wesprzeć rozwój rozszerzenia na platformie [**Buy Me a Coffee**](https://buymeacoffee.com/mksawic).

**English:** You can support the project on [**Buy Me a Coffee**](https://buymeacoffee.com/mksawic).
