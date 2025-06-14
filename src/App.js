import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalculatorConstructor } from './components/CalculatorConstructor';
import { ModeSwitcher } from './components/ModeSwitcher';
import { DraggableComponent } from './components/DraggableComponent';
import { useCalculatorStore } from './store/store';

function App() {
    const [mode, setMode] = useState('constructor');
    const { displayValue, resetCalculator } = useCalculatorStore();

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <ModeSwitcher mode={mode} setMode={setMode} />

                <div className="calculator-container">
                    {mode === 'constructor' && (
                        <div className="components-palette">
                            <h3>Доступные компоненты</h3>
                            <DraggableComponent type="display" />
                            <DraggableComponent type="operations" />
                            <DraggableComponent type="numpad" />
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