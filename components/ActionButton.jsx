import React from 'react'

const ActionButton = ({children, className, buttonType='button', isPending, onClick, isRestricted = false}) => {
    return (
        <button type={buttonType} onClick={onClick} disabled={isPending || isRestricted} className={`${className} ${isPending ? 'pointer-events-none' : ''} ${isRestricted ? 'cursor-not-allowed' : ''}`}>
            {children}
        </button>
    )
}

export default ActionButton