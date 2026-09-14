# Finora

Interaktiv React Native/Expo-MVP til et innovationsprojekt. Det eksisterende lyse fintech-design er bevaret med grønne cards og afrundede hjørner. Appen har kun to hovedskærme: **Home** og **Income & Expenses**.

Kun lokal React state og fiktive startdata. Ingen backend, database, login, API-kald eller aktiv AI-funktion. Ændringer bevares under navigation, men nulstilles ved genindlæsning/genstart.

## Start

Med Node.js og npm installeret:

```sh
cd /Users/sunepanduro/Finora/min_app
npm install
npm run web
```

Åbn den lokale adresse, terminalen viser. Afhængighederne er allerede installeret i dette workspace; `npm install` er især relevant ved en frisk kopi.

Til mobil:

```sh
npm start
```

Scan QR-koden med Expo Go, der understøtter projektets Expo SDK 57. Computer og telefon skal være på samme netværk. Alternativt `npm run ios` med Xcode og en iOS-simulator eller `npm run android` med en startet Android-emulator. Brug webdemoen, hvis telefonens Expo Go-version ikke understøtter SDK 57.

## Brug appen

1. Åbn **Income & Expenses** i bundnavigationen.
2. Vælg Income, Expenses, Savings eller Investments i de vandrette faner. Stryg fanerækken vandret på smalle skærme.
3. Tryk **+ Add**, skriv Name og Amount, og vælg Category for udgifter.
4. Tryk **Gem post**. Beløb bruger dansk format, fx `10000`, `10.000` eller `10.000,50`. Nul er tilladt; negative beløb, tomme navne og ugyldige beløb afvises.
5. Tryk på en eksisterende post for at ændre navn, beløb eller udgiftskategori. **Annuller** kasserer ændringer. **Slet post** efterfulgt af **Ja, slet posten** sletter posten.
6. Gå tilbage til **Home**. Alle tal og grafen følger straks de nye data.

Income og Expenses angives pr. måned. Savings og Investments er aktuelle beholdninger, ikke månedlige indbetalinger eller afdrag.

## State og beregninger

`FinanceProvider` ligger over bundnavigationen og deler ét `useState`-objekt gennem Context API. Objektet har fire lister: `income`, `expenses`, `savings`, `investments`. En post indeholder `id`, `name`, `amount` og desuden `category` for udgifter.

Tilføjelser, redigeringer og sletninger opdaterer state uden at mutere eksisterende data. Der er ingen separat dashboard-state at holde synkroniseret.

- Monthly Income og Monthly Expenses er summen af poster i hver liste.
- Monthly Cash Flow = Income − Expenses.
- Savings og Investments er summen af deres respektive lister.
- Det store Savings-card = Savings + Investments.

Summer beregnes i hele øre, før de omregnes til kroner. Cash flow flyttes ikke automatisk til opsparing. Derfor ændrer husleje og indkomst ikke formuen direkte.

Cirkeldiagrammet grupperer udgifter efter de syv faste kategorier. En skives andel er kategoriens sum / alle udgifter; vinklen er andelen × 360°. Beløb og afrundede procenter vises under grafen. Farverne er faste per kategori. Nulkategorier udelades; ingen positive udgifter giver en tomtilstand, og én kategori giver en hel cirkel. Afrundede procenter kan samlet afvige lidt fra 100 %.

## Monthly Savings History

Under Savings i Income & Expenses findes January–December for indeværende år. Indtast månedens samlede Savings + Investments og tryk **Gem måned**. Værdien kan senere rettes; et tomt felt efterfulgt af Gem fjerner registreringen. Historikken starter tom.

`monthlySavings` er en separat lokal `useState`-liste med 12 værdier i den eksisterende `FinanceProvider`. `null` betyder manglende registrering, mens 0 er en registreret værdi. Historikken ændrer ikke aktuelle konti eller deres total.

Home læser samme liste og tegner **Savings Development** via `Components/SavingsChart.js`. X-aksen viser måneder og Y-aksen samlet Savings i kroner. Kun registrerede måneder får punkter; linjen forbinder dem. Grafen opdateres ved Gem måned. Inputsektionen ligger i `Components/MonthlySavings.js`. Data nulstilles ved genindlæsning som resten af prototypen.

## Aktive filer

```text
App.js                           # To bundfaner og fælles provider
context/FinanceContext.js        # Lokal state samt save/remove
screens/HomeScreen.js            # Dashboard med afledte totals
screens/IncomeExpensesScreen.js  # Kategorifaner og FlatList
Components/EntryModal.js         # Opret, rediger, valider og slet
Components/ExpenseChart.js       # SVG-cirkeldiagram og legend
Components/FinanceUI.js          # Eksisterende fælles UI
data/financeData.js             # Startdata og beregningsfunktioner
styles/styles.js                 # Separat styling
tests/finance.test.mjs          # Beregnings- og datatests
```

De tidligere Transactions- og Advisor-skærme, BalanceChart og deres mockdata er bevaret som inaktive filer. De importeres ikke af den aktive navigation. Home viser hverken AI, den gamle formuegraf eller gamle transaktioner. Der er ikke tilføjet afhængigheder.

## Kontrol

```sh
node --test tests/finance.test.mjs
npx expo export --platform all
```

Testene dækker opret/rediger/slet i alle fire grupper, huslejestigning på 2.000 kr., formue, decimaler, validering, tomme data, negativt cash flow og kategoriændringer. Eksport kontrollerer imports og bundling til web, iOS og Android; det er ikke en manuel enhedstest.

Manuelt demoflow: Ret Rent fra 10.000 til 12.000 kr. Udgifter stiger fra 19.100 til 21.100 kr., cash flow falder fra 15.900 til 13.900 kr., Housing-andelen vokser, og Savings forbliver 136.400 kr. Prøv også at oprette opsparing, annullere en redigering og slette en post.

## Demovideo

**Link til demovideo:** [INDSÆT LINK TIL DEMOVIDEO HER]
