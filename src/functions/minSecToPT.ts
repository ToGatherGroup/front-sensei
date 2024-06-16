/*
    This function converts '10:15' to 'PT10M15S'
*/

export default function minSecToPT(time: string | undefined | null){
    if (!time) return time;
    const [min, sec] = time.split(":");
    return `PT${min}M${sec}S`
}