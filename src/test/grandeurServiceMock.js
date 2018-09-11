const grandeur = (key, label, units) => ({
    key,
    label,
    units
})

const unit = (shortname, name, coef) =>
    ({
        shortname: shortname,
        name: name,
        coef: coef
    })

export const loadUnitsDataMock = () => Promise.resolve(
    [
        grandeur("Ener", "Energie (wh, J, cal...)", [
            unit("J", "Joule", 0.23923445),
            unit("ws", "Watt-Seconde", 0.23923445),
            unit("cal", "calorie (cal)", 1),
            unit("wh", "Watt-Heure", 0.23923445 * 3600),
            unit("kWh", "KiloWatt-Heure", 0.23923445 * 3600 * 1000),
            unit("kcal", "Kilo-Calorie (kcal)", 1000),
            unit("Mcal", "Mega-calorie (Mcal)", 1000 * 1000)
        ]),
        grandeur("Dens", "Densité (mol, mmol...)", [
            unit("μmol", "Micro-mole", 0.000001),
            unit("mmol", "Milli-mole", 0.001),
            unit("mol", "Mole", 1)
        ]),
        grandeur("Nomb", "Nombre (pas d'unité)", [
            unit("Nomb", "pas d'unité", 1),
            unit("Item(s)", "items", 1)
        ]),
        grandeur("Volu", "Volume (L, m3...)", [
            unit("goutte", "Goutte", 0.001 * 20000),
            unit("L", "Litre", 0.001),
            unit("dL", "Déci-litre", 0.001 * 0.1),
            unit("cL", "Centi-litre", 0.001 * 0.01),
            unit("mL", "Milli-litre", 0.001 * 0.001),
            unit("m3", "Mètre-cube", 1),
        ]),
        grandeur("Duré", "Durée (sec, min, h...)", [
            unit("sec", "Seconde", 1),
            unit("min", "Minute", 60),
            unit("h", "Heure", 60 * 60),
            unit("j", "Jour", 60 * 60 * 24),
            unit("mois", "Mois", 60 * 60 * 24 * 30 * 355),
            unit("an", "Année", 60 * 60 * 24 * 30 * 355 * 12)
        ]),
        grandeur("Mass", "Masse (g, kg...)", [
            unit("mg", "Milligramme", 0.001),
            unit("g", "Gramme", 1),
            unit("kg", "Kilo-gramme (kg)", 1000),
            unit("t", "Tonne", 1000000),
            unit("Mt", "Mega-tonne", 1000000000)
        ]),
        grandeur("Surf", "Surface (m2, hec...)", [
            unit("m2", "Mètre-carré", 1),
            unit("hec", "Hectare", 10000)
        ]),
        grandeur("Long", "Longueur (mm, m, km...)", [
            unit("mm", "Millimètre", 0.001),
            unit("cm", "Centimètre", 0.01),
            unit("m", "Mètre", 1),
            unit("km", "Kilo-mètre", 1000)
        ]),
        grandeur("Pri1", "Prix/Coût (€...)", [
            unit("M€", "milliard d'euros", 1000000000),
            unit("m€", "million d'euros", 1000000),
            unit("k€", "Kilo-euro", 1000),
            unit("€", "euo", 1),
        ]),
        grandeur("Pri2", "Prix/Coût (€...)", [
            unit("M$", "Milliard de dollars", 1000000),
            unit("m$", "Million de dollars", 1000000),
            unit("k$", "Kilo-dollar", 1000),
            unit("$", "dollar", 1),
        ]),
        grandeur("Tran", "Transport (t*km...)", [
            unit("t*km", "Tonne Kilomètre", 1),
            unit("kg*km", "Kilogramme Kilomètre", 0.001)
        ])
    ])