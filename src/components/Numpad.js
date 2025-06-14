import { useCalculatorStore } from '../store/store';

export const Numpad = () => {
    const { inputDigit } = useCalculatorStore();

    return (
        <div className="numpad numpad-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button className="numpad-button" key={num} onClick={() => inputDigit(num)}>
                    {num}
                </button>
            ))}
            <button className="numpad-button zero" onClick={() => inputDigit('0')}>0</button>
            <button className="numpad-button" onClick={() => inputDigit('.')}>,</button>
        </div>
    );
};