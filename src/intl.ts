const _cache: Record<string, any> = {}

function IntlInfo(lang = 'en', includeCurrencies = true) {
    if (_cache[lang]) {
        return _cache[lang]
    }

    const countryNames = new Intl.DisplayNames([lang], { type: 'region', fallback: 'none' });
    const languageNames = new Intl.DisplayNames([lang], { type: 'language', fallback: 'none' });
    const currencyNames = new Intl.DisplayNames([lang], { type: 'currency', fallback: 'none' });

    const countries: Record<string, any> = {}
    const languages: Record<string, any> = {}
    const currencies: Record<string, any> = {}

    let i,j,k,codeU,codeL,codeC,country,language,currency;

    if (! _cache.$) {
        _cache.$ = {
            U: [],
            L: [],
            C: []
        }

        const alpha: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

        for (i = 0; i < 26; ++i) {
            for (j = 0; j < 26; ++j) {
                if (alpha[i] && alpha[j]) {
                    codeU = alpha[i] + alpha[j]!

                    country = countryNames.of(codeU)
                    if (country) {
                        _cache.$.U.push(codeU)
                        countries[codeU] = country
                    }

                    codeL = codeU.toLowerCase()
                    language = languageNames.of(codeL)
                    if (language) {
                        _cache.$.L.push(codeL)
                        languages[codeL] = language
                    }

                    if (includeCurrencies) {
                        for (k = 0; k < 26; ++k) {
                            codeC = codeU + alpha[k]
                            currency = currencyNames.of(codeC)
                            if (currency) {
                                _cache.$.C.push(codeC)
                                currencies[codeC] = currency
                            }
                        }
                    }
                }
            }
        }
    } else {
        for (i = 0; i < _cache.$.U.length; ++i) {
            codeU = _cache.$.U[i]
            countries[codeU] = countryNames.of(codeU)
        }
        for (j = 0; j < _cache.$.L.length; ++j) {
            codeL = _cache.$.L[j]
            languages[codeL] = languageNames.of(codeL)
        }
        for (k = 0; k < _cache.$.C.length; ++k) {
            codeC = _cache.$.C[k]
            currencies[codeC] = currencyNames.of(codeC)
        }
    }

    return _cache[lang] = {
        countries,
        languages,
        currencies,
    }
}

IntlInfo._cache = _cache
export default IntlInfo