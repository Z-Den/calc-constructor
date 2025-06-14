import { useCalculatorStore } from '../store/store';

export const Operations = () => {
    const { handleOperator, performCalculation, resetCalculator } = useCalculatorStore();

    return (
        <div className="operations">
            <button onClick={() => handleOperator('+')}>+</button>
            <button onClick={() => handleOperator('-')}>-</button>
            <button onClick={performCalculation}>=</button>
            <button onClick={resetCalculator}>C</button>
        </div>
    );
};