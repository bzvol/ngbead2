export const tasks: {
  A: {
    imageUrl: string,
    story: string,
    subTasks: { text: string, xp: number }[],
    title: string
  },
  B: {
    imageUrl: string,
    story: string,
    subTasks: { text: string, xp: number }[],
    title: string
  },
  preview?: {
    imageUrl: string,
    text: string
  }
}[] = [
  {
    A: {
      imageUrl: 'assets/images/tasks/1/A/rally.png',
      story: 'Készíts egy egyszerű, felülnézetes (top-down nézetű) autóversenyzős játékot.',
      subTasks: [
        {
          text: `Készíts egy egyszerű **grafikus objektumot**, amely felülnézetből ábrázol egy autót.
          Legegyszerűbb esetben állhat egy téglalapból és négy ellipszisből (az autó teste és négy kereke),
          de készíthetsz ennél bonyolultabb és szebb megjelenést is.`,
          xp: 2
        },
        {
          text: `Készíts egy függvényt, amely **véletlenszerűen generál autókat** az alábbi tulajdonságokkal:
- Háttérszín (fix értékkészletből vagy akár rangom HEX/RGB színkód)
- Test életereje (szám, például 2 és 10 között)
- Kerekek életereje (szám, például 1 és 4 között)
- Gyorsulás (szám, például pixel/másodperc^2-ben)
- Maximális sebesség (szám, például pixel/másodpercben)`,
          xp: 1
        },
        {
          text: `**Generálj 6 darab véletlenszerű autót** (a korábban létrehozott függvény segítségével),
          majd rajzold ki őket egymás mellett a vászonra (Canvas).

Ügyelj arra, hogy az autók ne fedjék egymást, és jól elkülöníthetően jelenjenek meg.`,
          xp: 1
        },
        {
          text: `Egy **autó adatai jelenjenek meg** a felületen, amikor a felhasználó autó felé mozgatja a kurzort.
          Ezt az információt megjelenítheted Canvas technológiával, Canvas felett megjelenített tooltippel vagy
          popoverrel, de az is megfelelő ha egyszerűen csak a Canvason kívül megjelenik egy dobozban.

A lényeg, hogy a tartalma automatikusan frissüljön, ha pedig az egér nem egy autó felett van akkor ne jelezzünk semmit.`,
          xp: 2
        },
        {
          text: `A játék indítása előtt az **autók legyenek kattinthatók**.
          A játékos így választhatja ki, melyik autóval szeretne játszani.
          A kiválasztott autó vizuálisan is legyen megkülönböztetve (pl. border használatával).

A kiválasztással kapcsolatban az alábbi feltételeknek kell teljesülniük:
- Csak egy autó lehet kiválasztva egyszerre.
- Egy autóra történő második kattintás vonja vissza a kiválasztást.
- A kiválasztás kizárólag a játék indítása előtt legyen lehetséges.`,
          xp: 2
        },
        {
          text: `Helyezz el a felületet egy gombot a játék indításához. A **játék indítása** csak akkor legyen lehetséges,
          ha a játékos már választott autót.

Ha a játékos megpróbálja elindítani a játékot autóválasztás nélkül, jelenjen meg egy hibajelzés
(pl. figyelmeztető szöveg a Canvas felett vagy felugró üzenet).`,
          xp: 1
        },
        {
          text: `A játék indítása után a játékos tudja **irányítani a kiválasztott autót** a WASD vagy a kurzorbillentyűkkel.

A mozgatás során vedd figyelembe a korábban generált autóparamétereket:
- Gyorsulás: az autó sebessége fokozatosan növekedjen a megadott érték alapján.
- Maximális sebesség: az autó sebessége ne léphesse túl a maximumot.
- Fékezés: ha a játékos az aktuális iránnyal ellentétes gombot nyom meg, az autó lassuljon.
- Lassulás input nélkül: ha nem érkezik új irányítóbemenet, az autó lassuljon automatikusan (fokozatosan csökkenő sebességgel).

Az autó ne csak 4 fix irányba tudjon mozogni, hanem fokozatosan forduljon (rotate) amikor ilyen irányú inputot kap.

Törekedj arra, hogy az irányítás minél inkább használható (és ezáltal a játék játszható) legyen, de ha az irányítás a
szabályoknak megfelelően működik (lehet gyorsulni, lassulni, megállni, fordulni), viszont nem teljesen kényelmes, azért pontlevonás nem fog járni.`,
          xp: 4
        },
        {
          text: `Autók ne tudjanak egymásba csúszni, **ütközés** esetén keletkezzen egyértelmű reakció.

Fizikai reakció:
- Az ütköző autók visszapattannak vagy irányt váltanak az ütközés tengelye mentén (pl. x vagy y irány).
- Alternatív megoldás lehet az autók sebességének csökkentése vagy helyzetük korrekciója, hogy ne fedjék egymást.

Sérülésmodellezés:
- Ütközés esetén mindkét autónak csökkenjen vagy a test vagy pedig az ütköző kerék életereje, attól függően, hogy az
üközésben mely rész volt érintett.`,
          xp: 2
        },
        {
          text: `Ha egy autó bármely részének **életereje nullára csökken** (akár a testé, akár bármelyik keréké),
          akkor az autó kerüljön ki a versenyből és tűnjön el a Canvas-ről is.

Ha a játékos által irányított autó kerül ki a játékból, a játék azonnal érjen véget, és jeleníts meg egy üzenetet
a játékos számára (pl. "A jármű megsemmisült, vesztettél!").`,
          xp: 2
        },
        {
          text: `Helyezz el a pályán (Canvas-en) egy **startvonalat** és egy **célt**.
Az autók a startvonalról induljanak.

A pályán legyenek akadályok is, amelyekkel ütközve hasonló logikának kell lefutni, mint amikor az autó egymással ütköznek.
A pályának nem szükséges véletlenszerűnek lennie, be is égetheted az objektumot pozícióját.`,
          xp: 2
        },
        {
          text: `Amikor egy autó eléri a célt, a **játék érjen véget**. Ebben az állapotban:
- Minden autó álljon meg, ne mozogjanak tovább sem AI vezérléssel, sem felhasználói irányítással.
- A játékos se tudja többé irányítani a saját autóját,
- A Canvas-on jelenjen meg egy üzenet a nyertes autóról (pl. "Nyertes: Autó #3"). Ehhez érdemes egy nevet is rendelni az autókhoz.`,
          xp: 1
        },
        {
          text: `Bónusz feladat: A játékos által nem irányított autók is **próbáljanak eljutni a célba önállóan**.
          Célszerű olyan algoritmust készíteni ami próbálja kerülni az ütközéseket, de közelebb viszi a célhoz az autót.

A gép viselkedése szimulálható például úgy, hogy folyamatosan generál inputparancsokat
(pl. "előre", "jobbra-előre", "fékezés"), ugyanúgy, mintha felhasználói billentyűlenyomások történnének.

Itt sem szükséges a tökéletesre törekedni, de az autók mozogjanak önállóan és lehetőleg jussanak el a célba ha nem
akadályozza őket semmi.`,
          xp: 3
        },
      ],
      title: `Race`
    },
    B: {
      imageUrl: 'assets/images/tasks/1/B/lego.webp',
      story: '',
      subTasks: [
        {
          text: `A felületen egy eszköztár (toolbar) található, amely öt gombot tartalmaz:
- **Kijelölő mód** - az első gomb bekapcsolásával a felhasználó kiválasztó módban dolgozhat, azaz meglévő elemeket jelölhet ki és módosíthat.
- **Rajzeszközök** - a többi gombbal a felhasználó az alábbi alakzatokat helyezheti el a vásznon:
  - kör
  - ellipszis
  - háromszög
  - téglalap

A téglalap esetében egy előkészített megoldáskezdeményt találsz segítségként.
A többi alakzat elhelyezését hasonló logikával, önállóan kell implementálnod.`,
          xp: 2
        },
        {
          text: `Legyen lehetőség a lehelyezett objektumok animálására.

Ha a felhasználó jobb gombbal kattint egy elemre, jelenjen meg egy **felugró menü** (context menu) a kurzor pozíciójában.
A menü a következő opciókat tartalmazza:
- Forgatás jobbra
- Forgatás balra
- Ugráltatás (fel-le mozgás)

A forgatás animációk kör esetén ne legyenek elérhetőek.
`,
          xp: 1
        },
        {
          text: `Valósítsd meg az előző feladatban definiált **animációkat**.

Az animációk legyenek folyamatosak (végtelen ciklus), azaz addig működjenek, amíg le nem állítják őket külön parancsra
(ld.: következő feladat).
Minden egyes elem saját animációval rendelkezzen, amely nem befolyásolja a többit.

Az animációs típusok működjenek az alábbi módon:
- Forgatás jobbra: az objektum az óramutató járásával megegyező irányban forog.
- Forgatás balra: az objektum az óramutató járásával ellentétes irányban forog.
- Ugráltatás: az objektum folyamatosan mozogjon fel-le.`,
          xp: 3
        },
        {
          text: `Legyen lehetőség **animáció megállítására**.
Ha egy objektumon jelenleg fut animáció, akkor jobbklikk esetén ne az animációválasztó menü jelenjen meg,
hanem kizárólag egyetlen lehetőség: "Animáció megállítás".

Az animáció leállításakor az objektum abban a pozícióban és állapotban (forgatás) maradjon amelyben éppen tartott az animáció szerint.
Ezután az objektumra ismét jobbklikket alkalmazva újra elérhetők legyenek az animációs opciók.`,
          xp: 1
        },

        {
          text: `Készíts egy **újabb felhelyezhető alakzatot**: egy tetszőlegesen kiválasztott South Park karaktert.

A karakteren nyugodtan egyszerűsíts, nem muszáj ívelt vonalakat használni, csak egyenes vonalakból, körökből és téglalapokból
álló megvalósítás is elfogadható, a lényeg, hogy az alakzat és a színezés alapján azért megismerhető legyen a karakter.

Egészítsd ki az eszköztárt is, hogy legyen lehetőség az új, komplex objektum lehelyezésére.

![Cartman](/assets/images/tasks/1/B/cartman.png)

Segítség: https://www.southparkstudios.com/w/index.php?title=List_of_Characters&oldid=14766#Featured_4th_Graders`,
          xp: 3
        },
        {
          text: `Hozz létre egy oldalsó listanézetet a Konva canvas bal oldalán, amely a **jelenleg futó animációkat
          jeleníti meg valós időben**.

Minden listaelem tartalmazza a következő információkat:
- Az objektum típusa (pl. "Háromszög", "Kenny", stb.).
- Az aktuálisan futó animáció típusa (pl. "Forgás jobbra", "Ugráltatás").
- Hány másodperce fut az animáció (folyamatosan frissülő kijelzés).

Minden listaelem tartalmazzon egy interakciós lehetőséget is:
- Animáció megállítása. Ezzel az elem ki is kerül a listából.

Az listaelemek sorrendjével nem szükséges külön foglalkozni, lehet felhelyezési sorrendben.
Animáció indítása esetén természetesen azonnal jelenjen is meg az objektum a listában.

Segítség: https://ng.ant.design/components/list/en`,
          xp: 2
        },
        {
          text: `Egészítsd ki a bal oldali animációs listát egy új funkcióval:
minden listaelem tartalmazzon egy szám beviteli mezőt (number input), amellyel az **adott objektum animációjának sebessége állítható**.

Az input egy sebességszorzót jelöljön (pl. 1.0 az alapértelmezett érték, 0.5 lassítás, 2.0 gyorsítás).
Amint a felhasználó módosítja az értéket, a hozzá tartozó animáció azonnal alkalmazza az új sebességet
(tehát nincs szükség külön mentésre vagy megerősítésre).`,
          xp: 3
        },
        {
          text: `Egészítsd ki az animációs listát egy "szem" ikon (ng-zorro "eye" és "eye-invisible" ikonok) gombbal
          minden alakzat mellett.
          A gombbal a felhasználó **be- és kikapcsolhatja az alakzat láthatóságát** a Konva stage-en, tehát így ideiglenesen
          elrejthetővé válnak az animálódó objektumok.

Gombnyomásra az objektum azonnal tűjön el a vászonról, azonban a listában maradjon továbbra is látható.
Ilyenkor a gomb ikonja is frissüljön az aktuális állapot szerint és legyen lehetőség az objektum újbóli megjelenítésére.`,
          xp: 1
        },
        {
          text: `Lehessen **elnevezni a felhelyezett grafikus elemeket**.

Ha a felhasználó bal egérgombbal kattint egy grafikus elemre, jelenjen meg egy felugró ablak (modal).
A modal tartalmazza a következőket:
- Egy szöveges bevitelő mező (input), ahol a felhasználó meghadhatja az elem nevét.
- Két gomb: "Mégsem" és "Név mentése".

Név mentése esetén kerüljön be a név az alakzat adatai közé.
Ha az adott objektumhoz jelenleg fut animáció, a név azonnal frissüljön a bal oldali animációs listában is, típus
helyett a nevet jelenítsük meg, amennyiben az objektum rendelkezik névvel.

Segítség: https://ng.ant.design/components/modal/en`,
          xp: 3
        },
        {
          text: `Egészítsd ki a névadási funkciót a **név módosításának lehetőségével**.
          Ha felhasználó egy már elnevezett alakzatra kattint, akkor a felugró modalban:

- Az input mező alapértelmezett értékeként jelenjen meg a korábban megadott név.
- A felhasználó ezt az értéket módosíthassa, majd mentéssel felülírhassa a régi nevet.`,
          xp: 1
        },
      ],
      title: `Animation`
    },
    preview: undefined
  },
  {
    A: {
      imageUrl: 'assets/images/tasks/2/A/oblivion.png',
      story: `Készítsd el a "Guess Who?" társasjáték egyfős változatát.`,
      subTasks: [
        {
          text: `A játék célja, hogy a játékos kitalálja, melyik személyt választotta ki véletlenszerűen a gép.
Ehhez első lépésként hozz létre egy **adatstruktúrát**, amely leírja a megjelenő karaktereket.
- Név (pl.: "Kata", "Péter")
- Fej alak (legalább két típus legyen, de tetszőlegesen bővíthető: "kör", "tojás")
- Hajstílus (itt is legyen legalább kettő különböző opció)
- Hajszín (fix lehetőségek legyenek)
- Szemszín (szintén fix lehetőségek)
- Szemüveges (true vagy false)

A lehetséges opciókat érdemes TypeScript enum típusokkal reprezentálni.`,
          xp: 1
        },
        {
          text: `Generálj 20 darab véletlenszerű karaktert az előző feladatban létrehozott adatstruktúra alapján.
          Minden karakterhez tartozzon egy egyszerű portré, amely a hozzá tartozó tulajdonságok vizuális
          reprezentációját tartalmazza.

A **portrékat** a karakterhez rendelt adatok alapján **rajzold ki**.
Jelenjenek meg a Konva Canvas-on, több sorba rendezve (pl. 5 oszlop x 4 sor).

A kirajzolásnál törekedjetek az egyszerűségre, a cél a felismerhetőség, nem a részletesség:
- Fej alak: kör, ellipszis (esetleg kocka) a head shape-es enum alapján.
- Hajstílus: egyszerű, zárt formák (pl. különböző méretű poligon vagy körkombináció).
- Szemek: két kis kör, a szemszín alapján kitöltve.
- Szemüveg: két nagyobb kör a szemek körül, egy egyenes vonal az orr felett, opcionálisan oldalsó szárak.

Érdemes Konva.Group-ot használni a portrék logikai összefogásához, hogy később könnyebb legyen egyben kezelni a
karaktert (pl. kattintás megvalósításánál).`,
          xp: 2
        },
        {
          text: `A játék betöltésekor a logika véletlenszerűen válasszon ki egy személyt a generáltak közül.
          Ez lesz a **célszemély**, akit a játékosnak ki kell találnia.

A kiválasztott személy adatait logold ki a console-ra.`,
          xp: 1
        },
        {
          text: `Valósítsd meg, hogy ha a játékos rákattint egy portréra, akkor jelenjen meg egy felugró ablak (modal),
          amely tartalmazza a **kattintott személy összes tulajdonságát**
          (fej alakja, hajstílus, hajszín, szemszín, szemüveges-e).`,
          xp: 1
        },
        {
          text: `A Konva Canvas-tól balra jelenjenek meg űrlapelemek, amelyek segítségével a **játékos tippelhet a
          kiválasztott személy tulajdonságaira**.
          A kérdések alapján fogja majd a rendszer "szűrni" a listát (ld.: következő feladat).

Hozz létre egy-egy kiválasztómezőt (dropdown, radio group vagy checkbox) az alábbi tulajdonságokhoz:
- Fej alak
- Hajstílus
- Hajszín
- Szemszín
- Szemüveges

Minden inputmező mellett jelenjen meg egy külön gomb, amellyel a játékos beküldi a kérdést.
Ezt úgy kell elképzelni, hogy ha például a hajszín esetén kiválasztja a játékos a "rózsaszín" opciót és beküldi azt,
akkor ezzel tulajdonképpen arra kérdez rá, hogy a célszemély hajszín-e rózsaszín-e.`,
          xp: 1
        },
        {
          text: `A játékos által feltett kérdésre adott válaszok alapján **jelöld meg azokat a karaktereket,
          akik már biztosan nem lehetnek a kiválasztott személy**.

A beküldött kérdés alapján a rendszer vizsgálja meg, hogy a célszemély tulajdonsága megegyezik-e a választott értékkel:
- Ha nem egyezik, akkor az összes olyan karakter kiesik, akinek ez a tulajdonsága egyezik a megadott értékkel.
- Ha egyezik, akkor az összes eltérő értékkel rendelkező karakter esik ki.

Példa: a felhasználó arra kérdez rá, hogy a személy hajstílus-a kopasz-e.
Ha a kitalálandó személy nem kopasz akkor minden kopasz hajstílusú portré kiesett a játékból.
Ha a kitalálnadó személy kopasz, akkor viszont csak a kopaszok maradtak játékban.

Az ilyen módon "kieső" portrék legyenek a Canvas-on is megjelölve tetszőlegesen választott, de egyértelműen látható módon.
Történhet például elszürkítéssel vagy akár áthúzással is.

Fontos: egyszer kiesett karakter nem kerülhet vissza a játékba később akkor sem, ha egy következő kérdés alapján már nem esne ki.`,
          xp: 2
        },
        {
          text: `A kérdések és kizárások mellett legyen lehetőség egyetlen **végső tippet tenni**:
          a játékos megpróbálhatja megnevezni a kiválasztott személyt.

Ez a korábbi választós mezők helyett egy szabad szöveges input legyen, ahova a játékosnak a személy nevét kell
beírnia.
Az input mező mellett helyezz el egy gombot, amellyel a tipp beküldhető.

Ha a felhasználó eltalálja a játékos nevét akkor a "Gratulálokn nyertél!" üzenet jelenjen meg, továbbá az az információ,
hogy a győzelemhez mennyi lépésre volt szüksége.
Ha a játékos nem találja el a nevet akkor a "Sajnáljuk, nem találtad el. A helyes válasz: {{név}}" üzenet jelenjen meg.

Mindkét esetben a játék érjen véget, ne tudjon új kérdéseket illetve tippet beküldeni a játékos.`,
          xp: 2
        }
      ],
      title: `
        Guess Who
      `
    },
    B: {
      imageUrl: 'assets/images/tasks/2/B/2B.jpg',
      story: 'Komplex számítás végzése Web Workeren.',
      subTasks: [
        {
          text: `A projekted "assets/csv" mappájában található egy **2B.csv** nevű **fájl**,
          amely 10.000 darab számot tartalmaz.

A komponens inicializációjakor (ngOnInit) olvasd be ezt a fájlt és a benne található 10.000 számot tárold el
egy tömbben.`,
          xp: 1
        },
        {
          text: `Integráld a projektedbe __workers_ mappában található _konva.worker.ts_ **Web Worker**t az órai példa alapján,
          és állítsd be a **kommunikáció**t a fő szál (Angular komponens) és a worker között.

A worker és a fő szál tudjon üzeneteken keresztül kommunikálni, az ehhez szükséges feliratkozásokat készítsd el.`,
          xp: 1
        },
        {
          text: `A fő szálon korábban betöltött **számokat juttasd el a Web Workerhez**.

A küldési forma tetszőleges:
- lehet az egész tömb egyszerre, vagy
- egyesével küldött értékek sorozata

A worker oldalon a fogadott számokat tárold el egy number[] típusú változóban,
erre a következő részfeladatok során szükséged lesz még.`,
          xp: 1
        },
        {
          text: `A worker szálon végezd el a korábban átküldött számok **statisztikai kiértékelését**,
          majd küldd vissza az eredményt a fő szálnak.

A következő értékeket számold ki:
- Legkisebb szám
- Legnagyobb szám
- Átlag
- Medián
- Szórás

Az eredményeket elkészültük után juttasd vissza a fő szálra.
A fő szál ezt az eredményt fogadja is és logolja ki console-ra.`,
          xp: 3
        },
        {
          text: `A fő szálon Angular komponens segítségével **jelenítsd meg táblázatos formában azokat a statisztikai
          értékeket**, amelyeket a worker visszaküldött az előző feladatban.

A számítás alapját képező elemszám is jelenjen meg a táblázat sorában: "X darab szám alapján".

A táblázat sorai legyenek az egyes kiértékelések (jelenleg még csak egy sor jelenne meg az első 10.000 adat alapján),
oszlopai pedig az értékek (minimum, maximum, átlag, medián, szórás).`,
          xp: 1
        },
        {
          text: `A komponensben legyen egy gomb, amely **generál 1.000 újabb darab lebegőpontos számot**,
          majd utasítja a worker-t, hogy ezekkel a számokkal együtt számolja újra a statisztikákat.

A workeren az új számokat is tárold abban a tömbben amelybe az eredeti adatokat helyezted. Ezt követően futtasd le
a korábban implementált számításokat és az eredményeket juttasd vissza a fő szálra.

A fő szál a friss statisztikát új sorban jelenítse meg a korábbiak alatt (nem felülírva).
A statisztika sorai tehát a számítások történetét mutassák: pl. először 10.000, majd 11.000, stb. adat alapján.`,
          xp: 1
        },
        {
          text: `A fő szálon valósíts meg egy **töltőállapotot**, amely akkor jelenik meg, amikor a worker statisztikát
          számol, és eltűnik, miután az eredmény megérkezett.

Amikor a főszál utasítja a workert a statisztikák kiszámítására, de még nem érkezett meg eredményként a válasz,
a táblázat helyén vagy egy skeleton (https://ng.ant.design/components/skeleton/en) vagy pedig egy
spinner (https://ng.ant.design/components/spin/en) jelenjen meg, ezzel jelezve a felhasználónak, hogy a
számítások még folyamatban vannak.

Ha a worker válasza túl gyorsan érkezik, akkor is jeleníts meg legalább 1 másodpercnyi töltést (pl. setTimeout-tal),
hogy a működés vizuálisan ellenőrizhető legyen fejlesztés közben.`,
          xp: 2
        },
      ],
      title: `Worker`
    },
    preview: undefined
  },
]
