import { Observable, Observer } from 'rxjs';

import './components/my-item';
import './components/my-increase';
import './components/my-decrease';
import './ws-boilerplate'; // use it at the beginning, feel free to ignore it later on
import { setItemValue, setRateValue, incLabel, decLabel, updateLabel } from './dom';

type Currency = "USD" | "EUR" | "GBP" | "CHF"
type CurrencyDelta = number;

// uncomment, when major html view gets uncommented...
// const initialCash = '100000';
// const $cashInput: HTMLInputElement = <HTMLInputElement>document.getElementById('cash-input');
// $cashInput.value = initialCash;

Observable.interval(1000)
    .subscribe(setItemValue);

// implementation goes here
