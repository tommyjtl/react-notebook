'use client'

import { useState, useEffect } from 'react';

const useNarrowDevice = (breakpoint: number = 1280): boolean => {
    const [isNarrowDevice, setIsNarrowDevice] = useState<boolean>(false);

    useEffect(() => {
        const checkIfNarrowDevice = () => {
            setIsNarrowDevice(window.innerWidth < breakpoint);
        };

        // Check on initial load
        checkIfNarrowDevice();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfNarrowDevice);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIfNarrowDevice);
        };
    }, [breakpoint]);

    return isNarrowDevice;
};

export default useNarrowDevice;
