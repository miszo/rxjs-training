// DOM boilerplate

const item = document.getElementById('item');
export const setItemValue = (value) => item.setAttribute('value', value);

const rate = document.getElementById('rate');
export const setRateValue = (value) => rate.innerHTML = value;

export const incLabel = '<my-increase></my-increase>';
export const decLabel = '<my-decrease></my-decrease>';

const updateLabelGen = (label: HTMLElement) =>
    (newValue: string): void => {
        label.innerHTML = newValue
    },
    $USDRateLabel = document.getElementById('usd-rate'),
    $EURRateLabel = document.getElementById('eur-rate'),
    $GBPRateLabel = document.getElementById('gbp-rate'),
    $CHFRateLabel = document.getElementById('chf-rate'),
    $USDExchangeLabel = document.getElementById('usd-exchange'),
    $EURExchangeLabel = document.getElementById('eur-exchange'),
    $GBPExchangeLabel = document.getElementById('gbp-exchange'),
    $CHFExchangeLabel = document.getElementById('chf-exchange'),
    $USDTrendLabel = document.getElementById('usd-trend'),
    $EURTrendLabel = document.getElementById('eur-trend'),
    $GBPTrendLabel = document.getElementById('gbp-trend'),
    $CHFTrendLabel = document.getElementById('chf-trend');

export const updateLabel = {
    rate: {
        USD: updateLabelGen($USDRateLabel),
        EUR: updateLabelGen($EURRateLabel),
        GBP: updateLabelGen($GBPRateLabel),
        CHF: updateLabelGen($CHFRateLabel)
    },
    trend: {
        USD: updateLabelGen($USDTrendLabel),
        EUR: updateLabelGen($EURTrendLabel),
        GBP: updateLabelGen($GBPTrendLabel),
        CHF: updateLabelGen($CHFTrendLabel),
    },
    exchange: {
        USD: updateLabelGen($USDExchangeLabel),
        EUR: updateLabelGen($EURExchangeLabel),
        GBP: updateLabelGen($GBPExchangeLabel),
        CHF: updateLabelGen($CHFExchangeLabel)
    }
};
