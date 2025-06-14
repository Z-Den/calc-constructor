import { create } from 'zustand';

export const useCalculatorStore = create((set) => ({
    availableComponents: ['display', 'operations', 'numpad'],
    components: [],
    displayValue: '',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    fullExpression: '',

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
                    fullExpression: state.fullExpression + digit,
                    waitingForSecondOperand: false
                };
            }
            return {
                displayValue: state.displayValue === '0'
                    ? String(digit)
                    : state.displayValue + digit,
                fullExpression: state.fullExpression === '0'
                    ? String(digit)
                    : state.fullExpression + digit
            };
        }),

    handleOperator: (nextOperator) =>
        set((state) => {
            const inputValue = parseFloat(state.displayValue);
            let newFullExpression = state.fullExpression;

            // Если выражение пустое, начинаем с нуля
            if (state.fullExpression === '' && state.displayValue === '') {
                newFullExpression = '0' + nextOperator;
            }
            // Если последний символ - оператор, заменяем его
            else if (['+', '-', 'x', '/'].includes(state.fullExpression.slice(-1))) {
                newFullExpression = state.fullExpression.slice(0, -1) + nextOperator;
            }
            // Иначе добавляем оператор
            else {
                newFullExpression = state.fullExpression + nextOperator;
            }

            if (state.firstOperand === null) {
                return {
                    firstOperand: inputValue,
                    waitingForSecondOperand: true,
                    operator: nextOperator,
                    fullExpression: newFullExpression,
                    displayValue: newFullExpression
                };
            }

            if (state.operator) {
                const result = performCalculation(
                    state.firstOperand,
                    inputValue,
                    state.operator
                );

                return {
                    displayValue: newFullExpression,
                    firstOperand: result,
                    waitingForSecondOperand: true,
                    operator: nextOperator,
                    fullExpression: newFullExpression
                };
            }

            return {
                waitingForSecondOperand: true,
                operator: nextOperator,
                fullExpression: newFullExpression,
                displayValue: newFullExpression
            };
        }),

    performCalculation: () =>
        set((state) => {
            if (state.firstOperand === null || !state.operator) {
                return {};
            }
            let inputValue;
            if(state.displayValue[state.displayValue.length - 1] === '-' ||
                state.displayValue[state.displayValue.length - 1] === '+'){
                inputValue = 0;
            }
            else{
                inputValue = parseFloat(state.displayValue);

            }
            const result = performCalculation(
                state.firstOperand,
                inputValue,
                state.operator
            );

            return {
                fullExpression: String(result),
                displayValue: result,
                firstOperand: null,
                operator: null,
                waitingForSecondOperand: false
            };
        }),

    resetCalculator: () =>
        set({
            displayValue: '',
            fullExpression: '',
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