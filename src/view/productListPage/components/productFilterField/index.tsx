import { Option } from '../../../../model/Option'
import './style.css'

export interface ProductFilterFieldProps {
    name: string;
    title: string
    currentValue: string
    options: Option[]
    handleChanges: (value: string) => void;
}

export default function ProductFilterField({title, currentValue, options, handleChanges}: ProductFilterFieldProps) {

    return (
        <li className='filter-field'>
            <h4 className='filter-field__name'>{title}</h4>
            <ul className='filter-field__options'>
                {options.map(option => <li className={`filter-field__option ${currentValue == option.value && '--active'}`} onClick={() => handleChanges(option.value)}> {option.label} </li>)}
            </ul>
        </li>
    )
}

