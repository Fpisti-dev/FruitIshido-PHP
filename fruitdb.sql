-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2020. Nov 20. 15:05
-- Kiszolgáló verziója: 5.7.31
-- PHP verzió: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fruitdb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `manual`
--

DROP TABLE IF EXISTS `manual`;
CREATE TABLE IF NOT EXISTS `manual` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `PageNumber` int(11) NOT NULL,
  `ManualHTML` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `manual`
--

INSERT INTO `manual` (`Id`, `PageNumber`, `ManualHTML`) VALUES
(1, 1, 'PGltZyBzcmM9IlJlc291cmNlcy9FbXB0eVRhYmxlLnBuZyIgYWx0PSJFbXB0eSBUYWJsZSIgY2xhc3M9ImNlbnRlciIgc3R5bGU9IndpZHRoOiA2MCUiPjxiciAvPjxwPklzaGlkbyBpcyBhIGJvYXJkIGxvZ2ljIGdhbWUuIEl0cyBmaXJzdCBjb21wdXRlciB2ZXJzaW9uIHRoZSDigJnigJlXYXkgb2YgVGhlIFN0b25lc+KAmeKAmSBydW4gb24gRE9TLCBpdCB3YXMgcmVsZWFzZWQgaW4gMTk4OS4gSXTigJlzIGFuIGVhc3kgdG8gbGVhcm4gYnV0IGRpZmZpY3VsdCB0byBtYXN0ZXIgZ2FtZS4gVGhlIGdvYWwgb2YgdGhlIGdhbWUgaXMgdG8gcmVhY2ggdGhlIGhpZ2hlc3QgcG9zc2libGUgc2NvcmUuIFRoaXMgcmVxdWlyZXMgYSBsb3Qgb2Ygb2JzZXJ2YXRpb24gc2tpbGxzIGFuZCBwbGFubmluZy4gSXQgaXMgYSBwdXp6bGUgZ2FtZSBzaW1pbGFyIHRvIE1haGpvbmcuIFRoZSBnYW1lIGxhc3RzIHVudGlsIGFsbCBzdG9uZXMgaGF2ZSBiZWVuIHVzZWQsIG9yIGNhbm5vdCBiZSBwbGFjZWQgaW4gYSB3YXkgdGhhdCBtYXRjaGVzIHRoZSBydWxlcyBvZiB0aGUgZ2FtZS4gRHVyaW5nIHRoZSBnYW1lIHdlIGhhdmUgdG8gcGxhY2UgNzIgc3RvbmVzIG9uIHRoZSBib2FyZCAoOTYgZmllbGRzKS48L3A+'),
(2, 2, 'PGltZyBzcmM9IlJlc291cmNlcy9GcnVpdFNldC5QTkciIGFsdD0iRW1wdHkgVGFibGUiIGNsYXNzPSJjZW50ZXIiIHN0eWxlPSJ3aWR0aDogNjAlIj48YnIgLz48cD5FdmVyeSBzdG9uZSBoYXMgdG8gcHJvcGVydGllcywgYSBjb2xvdXIgYW5kIGEgc2hhcGUuIFRoZXJl4oCZcmUgNiBkaWZmZXJlbnQgY29sb3VycyBhbmQgNiBkaWZmZXJlbnQgc2hhcGVzLCBzbyB3ZSBoYXZlIDM2IHBvc3NpYmxlIHN0b25lcy4gVGhlcmXigJlyZSAyIG9mIGVhY2ggc3RvbmUsIHdoaWNoIG1ha2VzIDcyLiBUaGUgZmlyc3Qgc2l4IHN0b25lcyBhcmUgcGxhY2VkIGRvd24gYnkgdGhlIGNvbXB1dGVyIGF1dG9tYXRpY2FsbHksIHdoaWNoIHBsYWNlcyBkb3duIG9uZSBvZiBlYWNoIGNvbG91ciBhbmQgc2hhcGUuPC9wPg=='),
(3, 3, 'PGltZyBzcmM9IlJlc291cmNlcy9GcnVpdElzaGlkbzEwLlBORyIgYWx0PSJFbXB0eSBUYWJsZSIgY2xhc3M9ImNlbnRlciIgc3R5bGU9IndpZHRoOiA2MCUiPjxiciAvPjxwPldlIGNhbiBvbmx5IHBsYWNlIGEgc3RvbmUgbmV4dCB0byBhbm90aGVyIG9uZSBpZiBvbmUgb2YgaXRzIHByb3BlcnRpZXMgbWF0Y2hlcyB0aGUgb3RoZXIgb25l4oCZcyBuZXh0IHRvIGl0LiBJZiB3ZSBwbGFjZSBhIHN0b25lIGJldHdlZW4gMiBvdGhlciBzdG9uZXMsIHRoZW4gdGhlIHN0b25lIGhhcyB0byBtYXRjaCBvbmUgcHJvcGVydHkgb24gb25lIHNpZGUgYW5kIG9uZSBwcm9wZXJ0eSBvbiB0aGUgb3RoZXIuIFdpdGggMyBuZWlnaGJvdXJpbmcgc3RvbmVzIGl0IGhhcyB0byBtYXRjaCAxIHByb3BlcnR5IGZvciAyIHN0b25lcyBhbmQgYW5vdGhlciBwcm9wZXJ0eSBmb3IgdGhlIHRoaXJkIG9uZS4gV2hlbiB0aGVyZeKAmXJlIDQgbmVpZ2hib3VyaW5nIHN0b25lcywgaXQgbmVlZHMgdG8gbWF0Y2ggMi0yIHByb3BlcnRpZXMuPC9wPg=='),
(4, 4, 'PGRpdiBjbGFzcz0iZm9ybS1ncm91cCByb3ciPjxpbWcgc3JjPSJSZXNvdXJjZXMvU2NvcmVzLlBORyIgYWx0PSJFbXB0eSBUYWJsZSIgY2xhc3M9ImNvbC1zbS0zIiBzdHlsZT0id2lkdGg6IDgwJSI+PHAgY2xhc3M9ImNvbC1zbS03Ij5Zb3UgZG9u4oCZdCBnZXQgYSBzY29yZSBmb3IgdGhlIGFyZWEgc2hhZGVkIGEgZGlmZmVyZW50IGNvbG91ciBvbiB0aGUgc2lkZSBvZiB0aGUgYm9hcmQuIFlvdSBnZXQgc2NvcmVkIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgbmVpZ2hib3VyaW5nIHN0b25lcy4gSWYgdGhlIHN0b25lIGhhcyAxLzIvMy80IG5laWdoYm91cnMgdGhlbiB5b3UgY2FuIGdldCAxLzIvNCBvciA4IHBvaW50cy48YnIgLz48YnIgLz5Cb251cyBwb2ludHMgYXJlIGdpdmVuIGlmIHRoZXJlIGFyZSA0IG5laWdoYm91cmluZyBzdG9uZXMgKEZvdXIgV2F5KS4gMjUgcG9pbnRzIG9uIHRoZSBmaXJzdCBvbmUsIDUwIG9uIHRoZSBzZWNvbmQgb25lLCB0aGVuIGluIG9yZGVyIDEwMCwgMjAwLCA0MDAsIDYwMCwgODAwLCAxMDAwLCA1MDAwLCAxMDAwMCwgMjUwMDAsIDUwMDAwLiBGb3IgNTAwMDAgYm9udXMgcG9pbnRzIHlvdSBoYXZlIHRvIGRvIDEyIOKAmeKAmUZvdXIgV2F54oCZ4oCZLiBUaGUgbnVtYmVyIG9mIOKAmeKAmUZvdXIgV2F54oCZ4oCZIGFjaGlldmVkIGNhbiBmdXJ0aGVyIGluY3JlYXNlIHRoZSBzY29yZSwgd2l0aCBldmVyeSBzdG9yZSB0aGlzIHNjb3JlIGNhbiBiZSBkb3VibGVkLjxiciAvPjxiciAvPkZ1cnRoZXIgYm9udXNlcyBhcmUgZ2l2ZW4gZm9yIHBsYWNpbmcgYWxsIHRoZSBzdG9uZXMgKDEwMDApLCBpZiB0aGVyZeKAmXMgb25seSBvbmUgbGVmdCB0aGVuIDUwMCBhbmQgaWYgdGhlcmXigJlzIDIgbGVmdCB0aGVuIDEwMC4gSWYgb25lIG9mIHRoZSBzY29yZXMgaXMgYmVhdGVuIGluIHRoZSB0b3AgMTAgbGlzdCwgeW91IGNhbiByZXBsYWNlIHRoYXQgc2NvcmUgd2l0aCB5b3Vycy48L3A+PC9kaXY+'),
(5, 5, 'PHA+RnJ1aXQgSWNvbnM6IDxhIGhyZWY9Imh0dHA6Ly93d3cuYXJ0ZG9ja3MuY29tLzQwLWZyZXNoeS1mcnVpdHMtaWNvbnMvIj5odHRwOi8vd3d3LmFydGRvY2tzLmNvbS80MC1mcmVzaHktZnJ1aXRzLWljb25zLzwvYT48YnIgLz48YnIgLz5NYWluIGlkZWEgYW5kIGxvZ2ljYWwgb3BlcmF0aW9uczogPGEgaHJlZj0iaHR0cDovL3d3dy5wdWx5a2FrYWthcy5jb20vMjAxMC8wOC9pc2hpZG8tYy12MDFfNTYxMy5odG1sIj5odHRwOi8vd3d3LnB1bHlrYWtha2FzLmNvbS8yMDEwLzA4L2lzaGlkby1jLXYwMV81NjEzLmh0bWw8L2E+PGJyIC8+PGJyIC8+PC9wPg==');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `top10`
--

DROP TABLE IF EXISTS `top10`;
CREATE TABLE IF NOT EXISTS `top10` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `NickName` text NOT NULL,
  `Score` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- A tábla adatainak kiíratása `top10`
--

INSERT INTO `top10` (`Id`, `NickName`, `Score`) VALUES
(1, 'Adonis', 25),
(2, 'Biggie', 32),
(3, 'Cherry', 24),
(4, 'Bella', 49),
(5, 'Gandalf', 165),
(6, 'Goldilocks', 28),
(7, 'Gorgeous ', 48),
(8, 'Handsome', 19),
(9, 'Hulk', 22),
(10, 'Papa Bear', 47),
(11, 'Fpisti', 42),
(12, 'Andrea', 59),
(13, 'Gaga', 114),
(14, 'Punk', 69),
(15, 'Falcon', 14),
(16, 'Falcon', 78),
(17, 'Baolorg', 92),
(18, 'Mouse', 123),
(19, 'Noname', 23),
(20, 'Hastag', 71);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;