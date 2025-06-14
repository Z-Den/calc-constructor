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
    const {availableComponents} = useCalculatorStore();

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <ModeSwitcher mode={mode} setMode={setMode} />
                <p className="info">Компонент можно удалить двойным кликом</p>
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
                </div>
            </div>
        </DndProvider>
    );
}

export default App;