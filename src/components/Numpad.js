import { useCalculatorStore } from '../store/store';

export const Numpad = () => {
    const { inputDigit } = useCalculatorStore();

    return (
        <div className="numpad">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button key={num} onClick={() => inputDigit(num)}>
                    {num}
                </button>
            ))}
        </div>
    );
};