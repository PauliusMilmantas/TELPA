# Sistemos architektūros aprašas

## Santrauka

Sistema sudaryta naudojantis ASP .NET Core karkasu naudojant Angular. Siekiant plečiamumo, pagrindinis artifaktas „TELPA“ turi tik naršyklėje veikiančią vartotojo sąsają, esybių sąsajas ir jų saugojimo sluoksnį. Visa likusi logika pridedama „TELPA.Extensions.\*.dll“ artifaktais, įgyvendinant „TELPA“ aprašytas sąsajas. Pagrindinio artifakto konfigūracijoje nurodoma, kurie komponentai, rasti plėtinių artifaktuose, bus naudojami veikimo metu apgręžto valdymo aplinkoje.

Vidinė serverio architektūra sudaryta iš trijų dalių:

- kontrolerių „Controllers/\*Controller.cs“, atitinkančių REST API dalis;
- komponentų sąsajų „Components/I\*Component.cs“, apibrėžiančių dalykinę logiką vykdančių komponentų sąsajas, kurie bus įstatomi apgręžto valdymo aplinkos;
- komponentų „Components/\*Component.cs“, apibrėžiančių komponentus;
- esybių „Models/\*.cs“, pasiekiamų per „ApplicationDbContext.cs“ duomenų prieigos objektą.

Trijų sluoksnių architektūra serveryje siekiama atskirti verslo logiką nuo sąsajų:

- kontroleriai formuoja REST API JSON dokumentus, tačiau verslo logiką atlieka įstatytais komponentais;
- komponentai žino tik vienas kitų sąsają bei esybes, jų tipai parenkami konfigūracijos metu ir įstatomi apgręžto valdymo aplinkos;
- esybės neturi jokių žinių apie joms atliekamus veiksmus.

Naršyklėje išskiriami du sluoksniai:

- logikos komponentai, bendraujantys su serveriu ir reguliuojantys bendrą informaciją naršyklinėje programoje;
- sąsajos Angular karkaso komponentai, atitinkantys puslapius ir jų dalis, gaunantys ir siunčiantys informaciją serveriui ir kitiems sąsajos komponentams per Angular karkaso įstatomus logikos komponentus.

## Esybės ir ryšiai

Esybės, jų savybės ir ryšiai, atitinkantys duomenų bazės esybes.

### Duomenų tipai

1. Tipas
   - Paaiškinimas.

---

1. Kartotinė data

   - Simbolių eilutė formatu „MMMM-mm-dd“, bet laiko vienetai gali būti pakeista žvaigždutėmis „\*“ parodant, kad tas vienetas nesvarbus. Pavyzdžiui, „\*\*\*\*-01-01“ yra bet kurių metų sausio pirmoji. Lyginama algoritmu

   ```lietuvių
   x < y:
      x padalinamas per „-“
      y padalinamas per „-“
      padalintų x ir y dalys lyginamos atitinkamai:
         jei x dalis ar y dalis turi „*“, lyginamos kitos dalys
         kitaip jei x dalis ≥ y dalis kaip skaičiai, grąžinama „Ne“
      jei nesustojo, grąžinama „Taip“
   ```

### Esybės

1. Esybė
   - Savybė: paaiškinimas.

---

1. Darbuotojas
   - Elektroninio pašto adresas: simbolių eilutė. Pagrindinis raktas.
   - Slaptažodis: simbolių eilutė. Šifruotas.
   - Vardas: simbolių eilutė. Atitinka vardą, pavardę, laisvai keičiamas.
   - Rolė: simbolių eilutė. Gali būti `null`.
   - Vadovas: darbuotojas. Išorinis raktas, gali būti `null`.
1. Pakvietimas
   - Numeris: sveikas skaičius. Pagrindinis raktas.
   - Elektroninio pašto adresas: simbolių eilutė.
   - Nuoroda: simbolių eilutė.
   - Galiojimo pabaiga: data.
   - Kvietėjas: darbuotojas. Išorinis raktas, gali būti `null`.
1. Tema
   - Numeris: sveikas skaičius. Pagrindinis raktas.
   - Pavadinimas: simbolių eilutė.
   - Aprašymas: ilga simbolių eilutė. Saugo Markdown kodą.
   - Virštemė: tema. Išorinis raktas, gali būti `null`.
1. Temos nuoroda
   - Tema: tema. Pagrindinis raktas, išorinis raktas.
   - Nuoroda: simbolių eilutė. Pagrindinis raktas.
1. Išmokta tema
   - Tema: tema. Pagrindinis raktas, išorinis raktas.
   - Darbuotojas: darbuotojas. Pagrindinis raktas, išorinis raktas.
1. Rekomenduojama tema
   - Tema: tema. Pagrindinis raktas, išorinis raktas.
   - Darbuotojas: darbuotojas. Pagrindinis raktas, išorinis raktas.
1. Mokymosi diena
   - Data: data be laiko. Pagrindinis raktas. Nurodo mokymosi dienos datą.
   - Komentaras: ilga simbolių eilutė. Saugo Markdown kodą.
   - Darbuotojas: darbuotojas. Pagrindinis raktas, išorinis raktas.
1. Mokymosi dienos tema
   - Mokymosi diena: mokymosi diena. Pagrindinis raktas, išorinis raktas.
   - Tema: tema. Pagrindinis raktas, išorinis raktas.
1. Mokymosi dienos nuoroda
   - Mokymosi diena: mokymosi diena. Pagrindinis raktas, išorinis raktas.
   - Nuoroda: simbolių eilutė. Pagrindinis raktas.
1. Apribojimas
   - Darbuotojas: darbuotojas. Pagrindinis raktas, išorinis raktas.
   - Pradžios data: kartotinė data. Pagrindinis raktas.
   - Pabaigos data: kartotinė data. Pagrindinis raktas.
   - Daugiausiai dienų iš eilės: sveikas skaičius.
   - Daugiausiai dienų iš viso: sveikas skaičius.

### Ryšiai

1. Ryšys
   - Esybė : Esybė (M : N, Kartais : Visada).
   - Paaiškinimas.

---

1. Darbuotojo vadovas
   - Darbuotojas : Darbuotojas (N : 1, Kartais : Kartais).
   - Darbuotojo tiesioginis vadovas, jo gali nebūti.
1. Darbuotojo mokymosi dienos
   - Darbuotojas : Mokymosi diena (1 : N, Kartais : Visada).
1. Darbuotojo apribojimai
   - Darbuotojas : Apribojimas (1 : N, Kartais : Visada).
   - Visiems taikomi apribojimai saugomi konfigūracijoje.
1. Temos virštemė
   - Tema : Tema (N : 1, Kartais : Kartais).
   - Temos virštemė, jos gali nebūti.
1. Temos nuoroda
   - Tema : Temos nuoroda (1 : N, Kartais : Visada).
1. Mokymosi dienos tema
   - Mokymosi diena : Tema (M : N, Kartais : Kartais).
   - Sistema neužtikrina, kad visos dienos turėtų po temą.
1. Mokymosi dienos nuoroda
   - Mokymosi diena : Mokymosi dienos nuoroda (1 : N, Kartais : Visada).
1. Išmokta tema
   - Tema : Darbuotojas (M : N, Kartais : Kartais).
   - Išmoktos temos įrašo buvimas rodo išmoktą temą.
1. Rekomenduojama tema
   - Tema : Darbuotojas (M : N, Kartais : Kartais).
   - Rekomenduojamos temos įrašo buvimas rodo rekomenduojamą temą.

## Funkcijos

Funkcijų, atliekančių verslo logiką, aprašai. Aprašomos funkcijos gali keisti sistemos būseną įvykiais, tačiau programoje tai nebūtinai įgyvendinama įvykių sistema, taip tiesiog išreikštinai rodomas funkcijos poveikis.

1. Funkcija
   - Esybė A, Esybė\[\] B -> Esybė\[\] C, Esybė D, įvykis arba įvykis
   - Funkcijos prielaidos.
   - Funkcijos veikimo aprašas.

---

## Komponentai

Sistemos komponentų aprašai. Komponentai

### Komponentas

Aprašymas.

1. Funkcija.
   - Paaiškinimas.

---

### Laiškų siuntimo komponentas

Komponentas, siunčiantis elektroninius laiškus iš konfigūracijoje nurodytos pašto dėžutės.

1. Siųsti laišką.
   - Siunčia laišką nurodyta tema ir turiniu.
