type ButtonProps = {
    label: string;
    type: 'button' | 'submit';
    align?: 'center' | 'left' | 'right';
    style?: 'btn_default' | 'btn_red' | 'btn_white';
}

const Button = ({ label, type, align, style }: ButtonProps) => {
    const margin = {
        center: 'mx-auto',
        left: 'ml-0 mr-auto',
        right: 'mr-0 ml-auto',
    }

    return (
        <button type={type} className={`${style ?? 'btn_default'} ${margin[align ?? 'center']}`}>
            {label}
        </button>
    )
}

export default Button;
