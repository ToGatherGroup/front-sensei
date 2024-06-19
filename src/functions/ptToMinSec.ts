/*
    This function converts 'PT10M15S' to '10:15'
*/

export default function ptToMinSec(ptString: string | undefined | null){
    if (!ptString) return ptString;
    const [min, sec] = ptString.replace('PT', '').replace('M', ':').replace('S', '').split(':');
    const minSec = `${min.length < 2 ? '0' : ''}${min}:${sec.length < 2 ? '0' : ''}${sec}`;
    return minSec;
}