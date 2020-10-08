import React from 'react';

export default React.forwardRef<HTMLInputElement, {
    id, name, data, disabled
}>(
    ({ id, name, data, disabled }, ref) => {
        return (
            <>
                <label>
                    Body
                    <input
                        type='text'
                        ref={ref}
                        id={id}
                        name={name}
                        defaultValue={data}
                        disabled={disabled}
                    />
                </label>
            </>
        )
    }
);