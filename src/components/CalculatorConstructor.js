import { useDrop } from 'react-dnd';
import { Display } from './Display';
import { Operations } from './Operations';
import { Numpad } from './Numpad';
import { useCalculatorStore } from '../store/store';

export const CalculatorConstructor = ({ mode }) => {
    const { components, availableComponents, removeComponent } = useCalculatorStore();

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item) => addComponentToConstructor(item.type),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addComponentToConstructor = (type) => {
        if (mode === 'constructor' && availableComponents.includes(type)) {
            useCalculatorStore.getState().addComponent(type);
        }
    };

    const handleDoubleClick = (index) => {
        if (mode === 'constructor') {
            removeComponent(index);
        }
    };

    const renderComponent = (type, index) => {
        switch (type) {
            case 'display':
                return <Display key={`display-${index}`} />;
            case 'operations':
                return <Operations key={`operations-${index}`} />;
            case 'numpad':
                return <Numpad key={`numpad-${index}`} />;
            default:
                return null;
        }
    };

    return (
        <div
            ref={drop}
            className={`constructor-area ${isOver ? 'highlight' : ''}`}
        >
            {components.length === 0 ? (
                <p>Перетащите сюда любой элемент из левой панели</p>
            ) : (
                components.map((component, index) => (
                    <div
                        key={`${component}-${index}`}
                        onDoubleClick={() => handleDoubleClick(index)}
                        className="constructor-component"
                    >
                        {renderComponent(component, index)}
                    </div>
                ))
            )}
        </div>
    );
};