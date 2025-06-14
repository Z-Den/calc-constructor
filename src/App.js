import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalculatorConstructor } from './components/CalculatorConstructor';
import { ModeSwitcher } from './components/ModeSwitcher';
import { DraggableComponent } from './components/DraggableComponent';
import { useCalculatorStore } from './store/store';

import './App.css';

function App() {
    const [mode, setMode] = useState('constructor');
    const { displayValue, availableComponents, resetCalculator } = useCalculatorStore();

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <ModeSwitcher mode={mode} setMode={setMode} />

                <div className="calculator-container">
                    {mode === 'constructor' && (
                        <div className="components-palette">
                            <h3>Доступные компоненты</h3>
                            {availableComponents.includes('display') && (
                                <DraggableComponent type="display" />
                            )}
                            {availableComponents.includes('operations') && (
                                <DraggableComponent type="operations" />
                            )}
                            {availableComponents.includes('numpad') && (
                                <DraggableComponent type="numpad" />
                            )}
                        </div>
                    )}

                    <CalculatorConstructor mode={mode} />

                    {mode === 'runtime' && displayValue && (
                        <button onClick={resetCalculator} className="reset-btn">
                            Сброс
                        </button>
                    )}
                </div>
            </div>
        </DndProvider>
    );
}

export default App;