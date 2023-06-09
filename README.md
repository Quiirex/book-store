[![Unit tests](https://github.com/Quiirex/book-store/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/Quiirex/book-store/actions/workflows/unit_tests.yml)

<br />
<p align="center">
  <h1 align="center">Book Store - Knjigarna</h1>

  <p align="center">
    Projekt pri predmetu IT arhitekture
  <br/>
  </p>
</p>

## O projektu

<p>
Projekt "Book Store" zajema 4 mikrostoritve, 2 API prehoda (gateway) 5 mikro-frontendov, na podlagi katerih demonstrira delovanje totalno decentraliziranega sistema, ki sledi načelom DDD (Domain-Driven Design) - v tem primeru knjigarne.
Sistem je sestavljen iz 4 mikrostoritev, ki so med seboj popolnoma neodvisne in komunicirajo preko asinhronih sporočil. Vsaka mikrostoritev ima svojo podatkovno bazo (MongoDB, PostgreSQL), ponekod se uporablja orodje Prisma za potrebe ORM. Mikrostoritve so napisane v različnih programskih jezikih in tehnologijah, kar omogoča lažjo primerjavo med njimi. Mikrostoritve so napisane v programskih jezikih Golang, Kotlin in Java. Za komunikacijo med mikrostoritvami se uporablja HTTP protokol in ponekod HTTP/2 protokol (gRPC). Mikrostoritve so pakirane v Docker slike in so na voljo na Docker Hub-u. Mikrofrontend-i so napisani v spletnih ogrodjih React.js in Solid.js in so prav tako pakirani v Docker slike, za medsebojno povezovanje uporabljajo plugin Module Federation orodja Webpack. Med mikrostoritvami in mikro-frontendi poteka vsa komunikacija izključno preko API prehoda (gateway). Za upravljanje z mikrostoritvami se uporablja orkestrator Kubernetes. Rešitev je pripravljena za uvedbo v OpenShift Cluster.
<br/>

## CatalogService

<img src="https://i.imgur.com/OyYOaF1.png">
<p>Slika 1 - Predvidena strukturna zasnova mikrostoritve CatalogService</p>

- Aplikacijska plast: iskanje knjig, podrobnosti o knjigah, priporočila za knjige.
- Domenska plast: entiteta knjiga, repozitorij knjig, knjižna storitev.
- Infrastrukturna plast: podatkovna baza knjig, API za knjige

| Funkcionalne zahteve                                                            | Nefunkcionalne zahteve                                                    |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Možnost iskanja knjig na podlagi različnih meril, kot so naslov, avtor in žanr. | Visoka razpoložljivost in zanesljivost                                    |
| Možnost pridobivanja podrobnih informacij o določeni knjigi.                    | Skalabilnost za obvladovanje velikega prometa in velikih količin podatkov |
| Možnost posodobitve razpoložljivosti in cene knjige                             | Hiter odzivni čas za iskanje knjig in podrobnosti                         |

## OrderService

<img src="https://i.imgur.com/qxrYO9n.png">
<p>Slika 2 - Predvidena strukturna zasnova mikrostoritve OrderService</p>

- Aplikacijska plast: nakupovalna košarica, postopek blagajne, zgodovina naročil.
- Domenska plast: entiteta naročilo, repozitorij naročil, storitev naročila.
- Infrastrukturna plast: podatkovna baza naročil, API za naročila.

| Funkcionalne zahteve                                      | Nefunkcionalne zahteve                                                        |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Možnost dodajanja in odstranjevanja elementov iz košarice | Varna in zanesljiva obdelava naročila                                         |
| Možnost uporabe kode za popust                            | Hitra obdelava in izpolnjevanje naročil                                       |
| Možnost izdelave računov in pošiljanja potrdila strankam  | Sposobnost obvladovanja velikega števila naročil v času največjih obremenitev |

## UserService

<img src="https://i.imgur.com/PRrZnao.png">
<p>Slika 3 - Predvidena strukturna zasnova mikrostoritve UserService</p>

- Aplikacijska plast: prijava uporabnika, registracija uporabnika, profil uporabnika.
- Domenska plast: entiteta uporabnik, repozitorij uporabnikov, uporabniška storitev.
- Infrastrukturna plast: storitev avtentikacije in avtorizacije, podatkovna baza uporabnikov, uporabniški vmesnik API.

| Funkcionalne zahteve                                                                                                                 | Nefunkcionalne zahteve                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Možnost registracije novega uporabniškega računa                                                                                     | Varni postopki avtentikacije in avtorizacije                           |
| Možnost preverjanja pristnosti uporabnikov z različnimi metodami, kot so JWT žetoni                                                  | Zmožnost upravljanja velikega števila sočasnih uporabniških sej        |
| Možnost upravljanja uporabniških profilov, vključno z osebnimi podatki, naslovi za pošiljanje in zaračunavanje ter zgodovino naročil | Hiter odzivni čas za avtentikacijo uporabnikov in upravljanje profilov |

## ReviewService

- Pomožna storitev, ki omogoča uporabnikom, da dodajo ocene in komentarje za knjige.

## Zagon

- Za zagon sistema je potrebno imeti nameščen [Docker](https://www.docker.com/) in [Docker Compose](https://docs.docker.com/compose/).

```bash
# Zagon celotnega sistema
docker-compose up
```

## Uporabljene tehnologije

- [Golang](https://go.dev/)
- [Kotlin](https://kotlinlang.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Quarkus](https://quarkus.io/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
