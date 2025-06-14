import { create } from 'zustand';

export const useCalculatorStore = create((set) => ({
    availableComponents: ['display', 'operations', 'numpad'],
    components: [],
    displayValue: '',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,

    addComponent: (component) =>
        set((state) => ({
            components: [...state.components, component],
            availableComponents: state.availableComponents.filter(c => c !== component)
        })),

    removeComponent: (index) =>
        set((state) => {
            const removedComponent = state.components[index];
            return {
                components: state.components.filter((_, i) => i !== index),
                availableComponents: [...state.availableComponents, removedComponent]
            };
        }),

    inputDigit: (digit) =>
        set((state) => {
            if (state.waitingForSecondOperand) {
                return {
                    displayValue: String(digit),
                    waitingForSecondOperand: false
                };
            }
            return {
                displayValue: state.displayValue === '0'
                    ? String(digit)
                    : state.displayValue + digit
            };
        }),

    inputDecimal: () =>
        set((state) => {
            if (state.waitingForSecondOperand) {
                return {
                    displayValue: '0.',
                    waitingForSecondOperand: false
                };
            }
            return {
                displayValue: state.displayValue.includes('.')
                    ? state.displayValue
                    : state.displayValue + '.'
            };
        }),

    handleOperator: (nextOperator) =>
        set((state) => {
            const inputValue = parseFloat(state.displayValue);

            if (state.firstOperand === null) {
                return {
                    firstOperand: inputValue,
                    waitingForSecondOperand: true,
                    operator: nextOperator
                };
            }

            if (state.operator) {
                const result = performCalculation(
                    state.firstOperand,
                    inputValue,
                    state.operator
                );

                return {
                    displayValue: String(result),
                    firstOperand: result,
                    waitingForSecondOperand: true,
                    operator: nextOperator
                };
            }

            return {
                waitingForSecondOperand: true,
                operator: nextOperator
            };
        }),

    performCalculation: () =>
        set((state) => {
            if (state.firstOperand === null || !state.operator) {
                return {};
            }

            const inputValue = parseFloat(state.displayValue);
            const result = performCalculation(
                state.firstOperand,
                inputValue,
                state.operator
            );

            return {
                displayValue: String(result),
                firstOperand: null,
                operator: null,
                waitingForSecondOperand: false
            };
        }),

    resetCalculator: () =>
        set({
            displayValue: '',
            firstOperand: null,
            operator: null,
            waitingForSecondOperand: false
        })
}));

function performCalculation(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        default:
            return secondOperand;
    }
}