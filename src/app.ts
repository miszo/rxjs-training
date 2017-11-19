import { Observable, Observer } from 'rxjs';

import './components/my-item';
import './components/my-increase';
import './components/my-decrease';
// import './ws-boilerplate'; // use it at the beginning, feel free to ignore it later on

import { setItemValue, setRateValue, incLabel, decLabel, updateLabel } from './dom';
import { coldStreamSingle } from './single';
import { coldStreamMulti } from './multi';

type Currency = "USD" | "EUR" | "GBP" | "CHF"
type CurrencyDelta = number;

const initialCash = '100000';
const $cashInput: HTMLInputElement = <HTMLInputElement>document.getElementById('cash-input');
$cashInput.value = initialCash;

Observable.interval(1000)
    .subscribe(setItemValue);

// implementation goes here

const toFixed = digits =>
    value => (value).toFixed(digits)
const to2 = toFixed(2), to4 = toFixed(4)

const exchange = (cash, rate) => cash / rate

const cashInputChange$ = Observable.fromEvent($cashInput, 'change')
    .map((e: any) => e.target.value)
    .startWith(initialCash)

// -> slightly more performant - shared connection for all currencies
let allRatesUpdate$ = coldStreamMulti(["USD", "EUR", "GBP", "CHF"]).share()

const setupStreamsForCurrency = (currency: Currency) => {
    let rateUpdate$ = allRatesUpdate$.pluck(currency)
    // -> less performant - separate connection for each currency
    // const rateUpdate$ = coldStreamSingle(currency).share()

    // rate
    rateUpdate$.map(to4).subscribe(updateLabel.rate[currency])

    // trend
    rateUpdate$.pairwise().map(([oldValue, newValue]) => newValue - oldValue > 0)
        .subscribe(increasing => updateLabel.trend[currency](increasing ? incLabel : decLabel))

    // exchange
    cashInputChange$
        .combineLatest(rateUpdate$, exchange)
        .map(to2)
        .subscribe(updateLabel.exchange[currency])
}

["USD", "EUR", "GBP", "CHF"].forEach(setupStreamsForCurrency)
