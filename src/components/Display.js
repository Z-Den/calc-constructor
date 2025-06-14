import { useCalculatorStore } from '../store/store';

export const Display = () => {
    const { displayValue } = useCalculatorStore();

    return (
        <div className="display">
            {displayValue || '0'}
        </div>
    );
};