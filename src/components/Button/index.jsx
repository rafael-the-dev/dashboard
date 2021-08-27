import './styles.css';

const Button = ({ id, label, role, ariaLabel, className, isDraggable, dragHandler, onClickHandler, onDragEnter,
    onDragLeave, onDragOver, onDrop })  => {
    return (
        <button 
            id={id}
            className={`button ${className}`} 
            draggable={isDraggable ? "true" : "false"} 
            aria-label={ariaLabel}
            data-role={role}
            onDragStart={dragHandler}
            onClick={onClickHandler}
            onDragEnter={onDragEnter ? onDragEnter : null}
            onDragLeave={onDragLeave ? onDragLeave : null}
            onDragOver={onDragOver ? onDragOver : null} 
            onDrop={onDrop ? onDrop : null}
            >
            { label }
        </button>
    );
};

export default Button;