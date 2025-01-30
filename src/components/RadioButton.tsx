import React from 'react';

type RadioButtonProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
    const handleChange = () => {
        onChange(value);
    };

    return (
        <label>
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={handleChange}
            />
            {label}
        </label>
    );
};

export default RadioButton;