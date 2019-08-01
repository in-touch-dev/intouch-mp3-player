module.exports = function formatTime(time){

    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60;
    const hours = Math.floor(time / 3600);

    const wholeSeconds = seconds.toFixed(0)

    if(hours !== 0)
    return hours +  ':'  +  minutes + ':' + wholeSeconds
    if(seconds < 9.5)
    return minutes + ':0' + wholeSeconds;
    else 
    return minutes + ':' + wholeSeconds;
}