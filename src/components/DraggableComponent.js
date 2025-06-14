import { useDrag } from 'react-dnd';
import {Display} from "./Display";
import {Operations} from "./Operations";
import {Numpad} from "./Numpad";

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
                return <Display />;
            case 'operations':
                return <Operations />;
            case 'numpad':
                return <Numpad />;
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