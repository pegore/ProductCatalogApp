import { useState } from 'react';
import { ProductFilterFieldProps } from '../productFilterField';
import '../productFilterField/style.css'


export interface ProductPriceFieldProps {
    name: string;
    currentValue: string
    handleChanges: (minValue: number, maxValue: number) => void;
}

export default function ProductPriceField({handleChanges}: ProductPriceFieldProps) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    function handleMinValue(event: any) {
        const minValue = parseFloat(event.target.value)
        setMinValue(minValue)
        handleChanges(minValue, maxValue)
    }

    function handleMaxValue(event: any) {
        const maxValue = parseFloat(event.target.value)
        setMaxValue(maxValue)
        handleChanges(minValue, maxValue)
    }


    return (
        <li className='filter-field'>
            <h4 className='filter-field__name'>Price</h4>
            <fieldset className='filter-field__fieldset'>
                <input className='filter-field__field' type="number" onInput={handleMinValue}/>
                <input className='filter-field__field'type="number" onInput={handleMaxValue}/>
            </fieldset>
        </li>
    )
}

