export function getDuration(time){

    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60;
    const hours = Math.floor(time / 3600);

    const wholeSeconds = seconds.toFixed(0)

    if(hours !== 0)
    return hours +  '.'  +  minutes + '.' + wholeSeconds
    
    else
    return minutes + '.' + wholeSeconds;
}