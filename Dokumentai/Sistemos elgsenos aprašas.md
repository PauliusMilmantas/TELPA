# Sistemos elgsenos aprašas

Sistemos elgsenos apraše surašyti sistemą apibūdinantys bruožai: reikalavimai, scenarijai ir kiti.

## Žodynas

Žodynas iš sąvokų ir paaiškinimo.

1. Sąvoka - paaiškinimas.

---

1. Rolė - darbuotojo pareigos, pavyzdžiui, „junior developer“ ir „senior developer“.
1. Darbuotojas - vaidmuo, atitinkantis DevBridge darbuotoją. Gali būti skirstomas rolėmis.
1. Komandos vadovas - vaidmuo, atitinkantis DevBridge komandos vadovą. Vadovauja vienai komandai, bet kitaip nuo darbuotojo nesiskiria.
1. Komanda - darbuotojai, vadovaujami komandos vadovo, ir jų komandos.
1. Apribojimas - taisyklėmis grįstas draudimas tam tikru metu pasirinkti mokymosi dienas.
1. Tema - mokymosi tema. Turi pavadinimą, aprašymą, nuorodas, potemes.
1. Potemė - viena iš temos dalių. Nesiskiria nuo temos.
1. Tikslas - rekomenduojama mokymosi tema darbuotojui, rolei arba komandai.
1. Mokymosi diena - viena iš riboto skaičiaus dienų, skirtina darbuotojui mokytis.

## Funkciniai reikalavimai

Funkciniai reikalavimai, parašyti naudotojiškos istorijos formatu. Prie reikalavimo gali būti pridėti priėmimo kriterijai pagal Behaviour Driven Development ruošinį.

1. Reikalavimas.
   - Kaip naudotojas, noriu A, kad B.
   - Esant S1, kai A, tai B.
   - Esant S2, kai A, tai C.

---

1. Darbuotojas gali registruoti darbuotojus sistemoje.
   - Kaip darbuotojas, noriu registruoti darbuotojus sistemoje, kad darbuotojai būtų pridėti prie mano komandos.
   - Esant registruotam darbuotojui, kai komandos vadovas registruoja darbuotoją, tai darbuotojas gauna elektroninį laišką su pakvietimu.
   - Esant neregistruotam darbuotojui, kai komandos vadovas registruoja darbuotoją, tai komandos vadovui rodomas pranešimas, kad darbuotojas jau registruotas.
1. Darbuotojas gali baigti registraciją sistemoje.
   - Kaip darbuotojas, noriu būti registruotas sistemoje, kad galėčiau naudotis sistema.
   - Darbuotojui turint galiojančią pakvietimo nuorodą, kai darbuotojas ją paspaudžia, tai gali įvesti norimą slaptažodį ir būti registruotas bei pridėtas prie komandos vadovo komandos.
   - Darbuotojui turint negaliojančią pakvietimo nuorodą, kai darbuotojas ją paspaudžia, gauna klaidos pranešimą.
1. Darbuotojas gali pašalinti darbuotojus iš savo komandos.
   - Kaip komandos vadovas, noriu pašalinti darbuotojus iš komandos, kad galėčiau jų nebesekti.
   - Esant darbuotojui vadovo komandoje, kuris neturi komandos, kai komandos vadovas pašalina darbuotoją iš savo komandos, tai darbuotojas būna pašalintas iš vadovo komandos.
   - Esant darbuotojui vadovo komandoje, kuris turi komandą, kai komandos vadovas pašalina darbuotoją iš savo komandos, tai vadovas gauna klaidos pranešimą.
1. Darbuotojas gali kurti temas.
   - Kaip komandos vadovas, noriu kurti temas, kad darbuotojai galėtų jas mokytis.
   - Kaip darbuotojas, noriu kurti temas, kad galėčiau jas mokytis.
1. Darbuotojas gali kurti tikslus.
   - Kaip komandos vadovas, noriu kurti tikslus darbuotojams, kad darbuotojai lengviau rastų reikalingus darbui mokymus.
1. Darbuotojas gali kurti mokymosi dienas.
   - Kaip darbuotojas, noriu kurti mokymosi dienas, kad galėčiau jų metu mokytis.
   - Darbuotojui neviršijus apribojimų kuriamai dienai, kai darbuotojas kuria mokymosi dieną, tai mokymosi diena būna sukurta.
   - Esant kuriamai dienai, kai darbuotojas kuria mokymosi dieną, tai darbuotojas gauna klaidos pranešimą.
   - Darbuotojui viršijus apribojimus kuriamai dienai, kai darbuotojas kuria mokymosi dieną, tai darbuotojas gauna klaidos pranešimą.
1. Darbuotojas gali peržiūrėti savo mokymosi dienas.
   - Kaip darbuotojas, noriu matyti savo mokymosi dienas, kad žinočiau, kurią temą kaip mokytis.
1. Darbuotojas gali peržiūrėti savo komandos mokymosi dienas.
   - Kaip komandos vadovas, noriu matyti savo komandos mokymosi dienas, kad žinočiau, kas kada mokosi.
1. Darbuotojas gali peržiūrėti savo komandos temas.
   - Kaip komandos vadovas, noriu matyti savo komandos temas, kad žinočiau, kiek kas išmoko ar mokysis.
1. Darbuotojas gali peržiūrėti visų temų medį.
   - Kaip darbuotojas, noriu matyti visas temas, kad žinočiau, kurią temą rinktis.
   - Kaip komandos vadovas, noriu matyti savo komandos išmoktas temas, kad žinočiau, kiek kas išmoko.
1. Darbuotojas gali peržiūrėti savo komandos medį.
   - Kaip komandos vadovas, noriu matyti savo komandos struktūrą, kad žinočiau, kaip ji sudaryta.
   - Kaip komandos vadovas, noriu matyti savo komandos išmoktas temas, kad žinočiau, kas ką išmoko.
1. Darbuotojas gali kurti apribojimus.
   - Kaip komandos vadovas, noriu kurti apribojimus, kad valdyčiau komandos skiriamas mokymosi dienas.
   - Esant dienų, pažeidžiančių kuriamą apribojimą, kai darbuotojas kuria apribojimą, tai darbuotojas gauna klaidos pranešimą ir pasirinkimą tęsti.

## Nefunkciniai reikalavimai

Nefunkciniai reikalavimai, sudaryti iš apribojimų ir paaiškinimų.

1. Reikalavimas.
   - Apribojimas.
   - Paaiškinimas.

---

1. Sistema turi pranešti apie duomenų keitimą vienu metu.
   - Jei sistemoje duomenys yra išsaugojami vieno darbuotojo tuo metu, kai kitas juos keičia, keičiantis turi gauti pranešimą, kad jo keičiama informacija yra pasenusi ir turėti galimybę perrašyti sava arba atnaujinti.
1. Sistema turi vesti žurnalą.
   - Jei sistemoje darbuotojas atlieka veiksmą, keičiantį ilgalaikius duomenis, sistema turi žurnale nurodyti laiką, darbuotoją, vykdomą metodą.
1. Sistemos sąsaja turi atsakyti per 5 sekundes.
   - Darbuotojo veiksmas neturi sustabdyti vartotojo sąsajos ilgiau nei penkioms sekundėms.

## Užduočių scenarijai

Užduočių scenarijai veikiamąja kalba.

1. Užduotis.
   1. Scenarijus.

---

1. Pakviesti naują darbuotoją.
   1. Darbuotojas atidaro darbuotojų kvietimo langą, įveda elektroninio pašto adresą ir paspaudžia kvietimo mygtuką.
   1. Sistema patikrina, ar šis elektroninio pašto adresas priklauso registruotam naudotojui.
      1. Jei adresas registruotas, sistema parodo klaidos pranešimą.
      1. Jei adresas neregistruotas, sistema išsiunčia pakvietimą ir parodo sėkmės pranešimą.
1. Priimti pakvietimą.
   1. Naudotojas paspaudžia pakvietimo nuorodą.
   1. Sistema patikrina, ar ši nuoroda galioja.
      1. Jei nuoroda negalioja, sistema parodo negaliojančios pakvietimo nuorodos klaidos langą.
      1. Jei nuoroda galioja, sistema parodo registracijos langą.
   1. Naudotojas įveda vardą, slaptažodį, pakartotą slaptažodį ir paspaudžia patvirtinimo mygtuką.
   1. Sistema patikrina, ar slaptažodis ir pakartotas slaptažodis sutampa.
   1. Jei slaptažodžiai sutampa, sistema registruoja darbuotoją, prideda prie pakvietusiojo darbuotojo komandos, panaikina kvietimo nuorodą, prijungia darbuotoją ir parodo pagrindinį langą.
1. Prisijungti.
   1. Naudotojas atidaro prisijungimo langą, įveda elektroninio pašto adresą, slaptažodį ir spaudžia prisijungimo mygtuką.
   1. Sistema patikrina, ar įvesti duomenys atitinka turimą darbuotoją.
      1. Jei neatitinka, sistema parodo klaidos pranešimą.
      1. Jei atitinka, sistema parodo pagrindinį langą.
