const formattedDuration = (duration:number | string) => {
    if(typeof duration === 'number'){
    return `${Math.floor(duration / 60)}:${(duration % 60).toFixed(0).toString().padStart(2, '0')}`
    } else{
        return duration
    }
}


export default formattedDuration;