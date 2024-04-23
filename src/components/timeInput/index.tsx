import React, { useState, ChangeEvent } from 'react';

interface TimeInputProps {
    onTimeChange: (minutes: number, seconds: number) => void; // Callback para quando o tempo muda
}

const TimeInput = ({ onTimeChange }: TimeInputProps) => {
    const [minutes, setMinutes] = useState<number | string>("");
    const [seconds, setSeconds] = useState<number | string>("");

    const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const min = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        min < 10 ? setMinutes(`0${min}`) : setMinutes(min);
        onTimeChange(min, Number(seconds));
    };

    const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sec = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
        sec < 10 ? setSeconds(`0${sec}`) : setSeconds(sec);
        onTimeChange(Number(minutes), sec);
    };

    return (
        <div className='bg-inputColor rounded-md flex flex-nowrap max-h-[24px]'>
            <input
                value={minutes}
                onChange={handleMinutesChange}
                min="0"
                max="59"
                placeholder="Min"
                className={`${styles.input} z-0`}
            />
            <span className='w-4 -z-3 bg-inputColor overflow-visible grid justify-items-center leading-6'>:</span>
            <input
                value={seconds}
                onChange={handleSecondsChange}
                min="0"
                max="59"
                placeholder="Seg"
                className={`${styles.input} z-1 `}
            />
        </div>
    );
};

export default TimeInput;

const styles = {
    input: "w-10 h-6 bg-inputColor focus:ring-blue-500 focus:ring-2 placeholder:italic placeholder:text-slate-400 placeholder:text-xs text-center placeholder:indent-11 px-0",
}
