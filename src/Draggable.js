import { linkEvent } from 'inferno';
import createElement from 'inferno-create-element';

const minOffset = 3;

const onMouseDown = (props, downEvent) => {
    const elementX = downEvent.currentTarget.getBoundingClientRect().left;
    const start = downEvent.clientX - elementX;
    let moved = false;
    const onMouseMove = moveEvent => {
        const pos = moveEvent.clientX - elementX;
        if (Math.abs(pos - start) > minOffset || moved) {
            moved = true;
            props.onDrag(moveEvent, pos);
        }
    };
    const onMouseUp = upEvent => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        const pos = upEvent.clientX - elementX;
        if (Math.abs(pos - start) > minOffset || moved) {
            props.onEnd(upEvent, upEvent.clientX - elementX);
        }
    };
    props.onStart(downEvent, start);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

const Draggable = props => (
    <div onMouseDown={linkEvent(props, onMouseDown)} style={{ position: 'relative' }}>
        {props.children}
    </div>
);

export default Draggable;