
const checkRRps=(myMove:string,oponentMove:string)=>{
    if((myMove==='rock' && oponentMove==='rock') || (myMove==='paper' && oponentMove==='paper') || (myMove==='scissors' && oponentMove==='scissors')) {
        return 'Draw';
    }
    if(myMove==='rock' && oponentMove==='paper') {
        return 'oponent';
    }
    if(myMove==='paper' && oponentMove==='rock') {
        return 'me';
    }
    if(myMove==='rock' && oponentMove==='scissors') {
        return 'me';
    }
    if(myMove==='scissors' && oponentMove==='rock') {
        return 'oponent';
    }
    if(myMove==='paper' && oponentMove==='scissors') {
        return 'oponent';
    }
    if(myMove==='scissors' && oponentMove==='paper') {
        return 'me';
    }
}


export default checkRRps;