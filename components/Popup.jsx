import Image from 'next/image'
import React, { useCallback, useState } from 'react'

const Popup = ({ children, className, hidden = true, onOpened, onClosed, popUpHeader }) => {
    const [closed, setClosed] = useState(hidden);

    const crossHandler = useCallback(
        () => {
            setClosed(true);
            onClosed?.();
        }, []
    );

    if (!closed) {
        onOpened?.();
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-900/25 z-10 ${closed ? 'hidden' : ''}`}>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className={className}>
                    <button type='button' className={`absolute w-6 h-6 top-6 -translate-y-1/2 right-8 translate-x-1/2 z-10`}
                        onClick={e => crossHandler?.()}>
                        <Image loading='eager' src='/x.svg' alt='' fill />
                    </button>
                    <div className='absolute top-0 left-0 w-full h-12'>
                        <h2 className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-xl'>
                            {popUpHeader}
                            <div className='w-full h-1 bg-black' />
                        </h2>
                    </div>
                    <div className='absolute top-12 left-0 w-full h-[calc(100%-3rem)] overflow-y-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup