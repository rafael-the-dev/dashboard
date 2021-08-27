import './styles.css';

const Button = ({ id, label, role, ariaLabel, className, isDraggable, dragHandler })  => {
    return (
        <button 
            id={id}
            className={`button ${className}`} 
            draggable={isDraggable ? "true" : "false"} 
            aria-label={ariaLabel}
            data-role={role}
            onDragStart={dragHandler}>
            { label }
        </button>
    );
};

export default Button;