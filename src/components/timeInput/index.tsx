import React, { useState, ChangeEvent } from 'react';

interface TimeInputProps {
    onTimeChange: (minutes: number, seconds: number) => void; // Callback para quando o tempo muda
}

const TimeInput = ({ onTimeChange }: TimeInputProps) => {
    const [minutes, setMinutes] = useState<number | string>("");
    const [seconds, setSeconds] = useState<number | string>("");

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const min = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        setMinutes(min);
        onTimeChange(min, Number(seconds));
    };

    const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sec = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        setSeconds(sec);
        onTimeChange(Number(minutes), sec);
    };

    return (
        <div className='bg-white rounded-md'>
            <input
                value={minutes}
                onChange={handleMinutesChange}
                min="0"
                max="59"
                placeholder="Min"
                className={`${styles.input} mr-1 z-0`}
            />
            <span className='h-6 w-12 -z-3 px-1 bg-white overflow-visible'>:</span>
            <input
                value={seconds}
                onChange={handleSecondsChange}
                min="0"
                max="59"
                placeholder="Seg"
                className={`${styles.input} ml-1 rz-1`}
            />
        </div>
    );
};

export default TimeInput;

const styles = {
    input: "w-10 h-6  bg-white focus:ring-blue-500 focus:ring-2 placeholder:italic placeholder:text-slate-400 placeholder:text-xs",
}
