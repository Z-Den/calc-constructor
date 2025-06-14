import { useDrag } from 'react-dnd';

export const DraggableComponent = ({ type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'component',
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const getComponentPreview = () => {
        switch (type) {
            case 'display':
                return <div className="component-preview display-preview">0</div>;
            case 'operations':
                return (
                    <div className="component-preview operations-preview">
                        <button>+</button>
                        <button>-</button>
                        <button>=</button>
                        <button>C</button>
                    </div>
                );
            case 'numpad':
                return (
                    <div className="component-preview numpad-preview">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                            <button key={num}>{num}</button>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={drag}
            className={`draggable-component ${isDragging ? 'dragging' : ''}`}
        >
            {getComponentPreview()}
            <p>{type === 'display' ? 'Дисплей' : type === 'operations' ? 'Операции' : 'Цифровая панель'}</p>
        </div>
    );
};