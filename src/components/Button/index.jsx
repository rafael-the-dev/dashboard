import './styles.css';

const Button = ({ label, ariaLabel, className })  => {
    return (
        <button className={`button ${className}`} aria-label={ariaLabel}>{ label }</button>
    );
};

export default Button;