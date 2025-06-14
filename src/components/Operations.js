import { useCalculatorStore } from '../store/store';

export const Operations = () => {
    const { handleOperator, performCalculation, resetCalculator } = useCalculatorStore();

    return (
        <div className="operations button-grid">
            <button onClick={() => handleOperator('+')}>+</button>
            <button onClick={() => handleOperator('-')}>-</button>
            <button>x</button>
            <button>/</button>
            <button className="equals" onClick={performCalculation}>=</button>
            <button className="reset" onClick={resetCalculator}>Сброс</button>
        </div>
    );
};