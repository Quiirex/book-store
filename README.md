<br />
<p align="center">
    <img src="https://static.vecteezy.com/system/resources/thumbnails/001/200/107/small/book.png" alt="Logo" width="230" height="105">

  <h1 align="center">Book Store</h1>

  <p align="center">
    Projekt pri predmetu IT arhitekture
  <br/>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## O projektu

<p>
Projekt "Book Store" zajema 3 mikrostoritve in 1 mikro-frontend.
<br/>
<br/>
1. Mikrostoritev se imenuje "CatalogService" in je odgovorna za upravljanje kataloga knjig in njihovih podrobnosti, kot so naslov, avtor, opis, slika naslovnice, cena in razpoložljivost.
<br/>
<br/>
2. Mikrostoritev se imenuje "OrderService" in je odgovorna za upravljanje postopka oddaje in izpolnjevanja naročil, vključno z upravljanjem strankine nakupovalne košarice, potrjevanjem plačil in ustvarjanjem računov.
<br/>
<br/>
3. Mikrostoritev se imenuje "UserService" in je odgovorna za upravljanje registracije, avtentikacije in avtorizacije uporabnikov ter upravljanje uporabniških profilov in nastavitev računov.
</p>

## CatalogService

<img src="https://i.imgur.com/OyYOaF1.png">
<p>Slika 1 - Predvidena strukturna zasnova mikrostoritve CatalogService</p>

* Aplikacijska plast: iskanje knjig, podrobnosti o knjigah, priporočila za knjige, wishlist.
* Domenska plast: entiteta knjiga, repozitorij knjig, knjižna storitev.
* Infrastrukturna plast: podatkovna baza knjig, API za knjige

| Funkcionalne zahteve                                                            | Nefunkcionalne zahteve                                                    |
|---------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Možnost iskanja knjig na podlagi različnih meril, kot so naslov, avtor in žanr. | Visoka razpoložljivost in zanesljivost                                    |
| Možnost pridobivanja podrobnih informacij o določeni knjigi.                    | Skalabilnost za obvladovanje velikega prometa in velikih količin podatkov |
| Možnost posodobitve razpoložljivosti in cene knjige                             | Hiter odzivni čas za iskanje knjig in podrobnosti                         |

## OrderService

<img src="https://i.imgur.com/qxrYO9n.png">
<p>Slika 2 - Predvidena strukturna zasnova mikrostoritve OrderService</p>

* Aplikacijska plast: nakupovalna košarica, postopek blagajne, zgodovina naročil.
* Domenska plast: entiteta naročilo, repozitorij naročil, storitev naročila.
* Infrastrukturna plast: podatkovna baza naročil, API za naročila.

| Funkcionalne zahteve                                      | Nefunkcionalne zahteve                                                        |
|-----------------------------------------------------------|-------------------------------------------------------------------------------|
| Možnost dodajanja in odstranjevanja elementov iz košarice | Varna in zanesljiva obdelava naročila                                         |
| Možnost uporabe kode za popust                            | Hitra obdelava in izpolnjevanje naročil                                       |
| Možnost izdelave računov in pošiljanja potrdila strankam  | Sposobnost obvladovanja velikega števila naročil v času največjih obremenitev |

## UserService

<img src="https://i.imgur.com/PRrZnao.png">
<p>Slika 3 - Predvidena strukturna zasnova mikrostoritve UserService</p>

* Aplikacijska plast: prijava uporabnika, registracija uporabnika, profil uporabnika.
* Domenska plast: entiteta uporabnik, repozitorij uporabnikov, uporabniška storitev.
* Infrastrukturna plast: storitev avtentikacije in avtorizacije, podatkovna baza uporabnikov, uporabniški vmesnik API.

| Funkcionalne zahteve                                                                                                                 | Nefunkcionalne zahteve                                                 |
|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Možnost registracije novega uporabniškega računa                                                                                     | Varni postopki avtentikacije in avtorizacije                           |
| Možnost preverjanja pristnosti uporabnikov z različnimi metodami, kot so JWT žetoni                                                  | Zmožnost upravljanja velikega števila sočasnih uporabniških sej        |
| Možnost upravljanja uporabniških profilov, vključno z osebnimi podatki, naslovi za pošiljanje in zaračunavanje ter zgodovino naročil | Hiter odzivni čas za avtentikacijo uporabnikov in upravljanje profilov |

## Uporabljene tehnologije

* [Kotlin](https://kotlinlang.org/)
* [React](https://reactjs.org/)
