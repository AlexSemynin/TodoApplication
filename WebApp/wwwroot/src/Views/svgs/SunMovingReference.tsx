import * as React from "react";
import './SunMovingReference.scss';
import chroma from 'chroma-js';
import SunSvg from './sun/SunSvg';
import Loader from '../components/UI/Loader/Loader';
import MoonSvg from './moon/MoonSvg';

interface ITime {
    hours: number | null;
    minutes: number | null;
    time: number | null;
}
interface IPosition {
    cx: number | null;
    cy: number | null;
}
interface ISkyBody{
    name: string | null;
    position: IPosition;
    currentPositionPercent: number | null;
    colors: Array<string> | null;
    currentColor: string | null;
}

interface IDayInfo{
    sunRise: ITime | null;
    sunSet: ITime | null;
    status: string | null;
    errorText: string | null;
    dayLength: number | null;
    nightLength: number | null;
    isDay: boolean | null;
}

interface IState {
    sunriseTime: ITime;
    sunsetTime: ITime;
    dayLength: number | null;
    nightLength: number | null;
    skyBody: ISkyBody;
    isDay: boolean | null;
}

class SunMovingReference extends React.Component<{}, IState>{

    constructor(props: any){
        super(props);
    }

    state : IState= {
        sunriseTime: {hours: null, minutes: null, time: null},
        sunsetTime: {hours: null, minutes: null, time: null},
        dayLength: null,
        nightLength: null,
        skyBody:{
            name: null,
            position: {cx: null, cy: null},
            currentPositionPercent: null,
            colors: null,
            currentColor: "#fff",
        },
        isDay: null
    };

    GetSkyBodyParams(sunriseTime: ITime, sunsetTime: ITime){
        let name, colors;
        if(this.state.isDay || this.isSunDay(sunriseTime, sunsetTime) ){
            name = "sun";
            colors = chroma.scale(['#ff973f','#fff03f','#ff3f3f']).mode('lch').colors(100);
        }else{
            name = "moon";
            colors = null;
        }
        return {name, colors}
    }

    

    //Изменение состояния
    SetSkyBodyToState(){
        //на этом этапе sunRise, sunSet, isDay уже установлены
        //изменить состояние SkyBody: name, colors
        let skyBody = Object.assign(this.state.skyBody, {}),
            name, colors;
        if(this.state.isDay){
            name = "sun";
            colors = chroma.scale(['#ff973f','#fff03f','#ff3f3f']).mode('lch').colors(100);
        }else{
            name = "moon";
            colors = null;
        }
        skyBody.name = name;
        skyBody.colors = colors;
        super.setState({skyBody});
    }

    UpdatePositionToState(){
        
        const skyBody : ISkyBody = Object.assign(this.state.skyBody, {});
        // let currentPositionPercent : number = skyBody.currentPositionPercent!;

        let currentPositionPercent: number = this.GetTimePassedPersent();


        //currentPositionPercent += 1;
        if(this.isSunDay() !== this.state.isDay){
            this.SetSkyBodyToState();
        }
        if(currentPositionPercent > 100){
            //вернуть новое небесное светило
            currentPositionPercent = 0;
            this.SetSkyBodyToState();
        }
        skyBody.position = this.GetPositionFromPersent(currentPositionPercent);
        skyBody.currentPositionPercent = currentPositionPercent;
        skyBody.currentColor = skyBody.colors?.[currentPositionPercent] ?? this.state.skyBody.currentColor;
        super.setState({skyBody})
    }

    InitState(dayInfo : IDayInfo){
        //Ставит при первой загрузке страницы время заката, рассвета и время суток
        const sunriseTime = dayInfo.sunRise!;
        const sunsetTime = dayInfo.sunSet!;
        const isDay = dayInfo.isDay;
        const skyBody = Object.assign(this.state.skyBody, {});

        let timePassedPercent : number;// = this.GetTimePassedPersent();
        if(isDay){
            const secondFromSunrise = this.GetSecondsStartTime2Current(sunriseTime);
            timePassedPercent = Number(( secondFromSunrise/dayInfo.dayLength!*100 ).toFixed()); 
        }else{
            const secondFromSundown = this.GetSecondsStartTime2Current(sunsetTime);
            timePassedPercent = Number(( secondFromSundown/dayInfo.nightLength!*100 ).toFixed()); //процент прошедшего времени отноистельно продолжительности ночи
        }

        const skyBodyMainParams = this.GetSkyBodyParams(sunriseTime, sunsetTime);
        const position : IPosition = this.GetPositionFromPersent(timePassedPercent);

        skyBody.name = skyBodyMainParams.name;
        skyBody.colors = skyBodyMainParams.colors;
        skyBody.currentPositionPercent = timePassedPercent;
        skyBody.position = position;
        skyBody.currentColor = skyBodyMainParams.colors?.[skyBody.currentPositionPercent] || "#fff";

        super.setState({
            sunriseTime,
            sunsetTime,
            isDay,
            skyBody,
            dayLength: dayInfo.dayLength,
            nightLength: dayInfo.nightLength
        });
    }

    async GetDayInfoByAPI() : Promise<IDayInfo>{
        const dayInfo : IDayInfo = {
            sunRise: null,
            sunSet: null,
            status: null,
            errorText: null,
            dayLength:  null,
            nightLength:  null,
            isDay: null,
        };
        const locationInfo = this.GetGeoLocationInfo();
        let apiUrl = `https://api.sunrise-sunset.org/json?lat=${locationInfo.lat}&lng=${locationInfo.long}`;

        let response = await fetch(apiUrl);
        try{
            if(!response.ok){
                let messageObject = await response.text();
                let status = JSON.parse(messageObject).status;
                //throw new Error(`статус ответа сервера api: ${status}`);
            }
            let result = await response.json();

            const dayLengthStr: string = result.results.day_length;
            let lengthDaySeconds = 0;
            dayLengthStr.split(':').map(elem => parseInt(elem)).reverse().forEach((elem, i) => { lengthDaySeconds += elem*Math.pow(60, i) });

            const sunRise : ITime = this.CreateTime(result.results.sunrise, true, false);
            const sunSet : ITime = this.CreateTime(result.results.sunset, true, true);
            dayInfo.sunRise = this.CreateTime(result.results.sunrise/*"00:59:08"*/, true, false);
            dayInfo.sunSet = this.CreateTime(result.results.sunset, true, true); 
            dayInfo.dayLength = lengthDaySeconds;
            dayInfo.nightLength = 24*60*60 - lengthDaySeconds;

            return dayInfo;        

        }catch(e){
            //CustomError.Disp2Console(e.message);
        }finally{
            return dayInfo;
        }
    }


    async componentDidMount(){

        const dayInfo = await this.GetDayInfoByAPI(); // {sunRise, sunSet({hours, minutes, time}), dayLength, nightLength}
        dayInfo.isDay = this.isSunDay(dayInfo.sunRise!, dayInfo.sunSet!);
        this.InitState(dayInfo);


        let stepSecIn100Persent = 0;

        if(this.state.isDay === true){ 
            stepSecIn100Persent = dayInfo.dayLength! / 100;
        }else if(this.state.isDay === false){
            stepSecIn100Persent = dayInfo.nightLength! / 100;
        }

        this.timerId = window.setInterval(()=>{
            this.UpdatePositionToState()
        }, stepSecIn100Persent * 1000);//100);//stepSecIn100Persent * 1000);

    }

    timerId: number | undefined;

    componentWillUnmount(){
        window.clearInterval(this.timerId!);
    }   

    render(){
        console.log(`render ${this.state.skyBody?.currentPositionPercent}%`);
        return(
            <>
                {this.state.isDay === null ?
                    <Loader isActive={true} /> :
                    this.state.isDay === false ? 
                    this.renderNightReference() :
                    this.renderDayReference()
                }
     
            </>
        )
    }

    //Вспомогательные методы рассчета
    //состояия
        GetPositionFromPersent(persent: number){
            const a = 632.5;
            const b = 295;

            let deg = 180 - persent*180/100;
            let rad = deg*Math.PI/180;

            let cx = 155+632.5+a*Math.cos(rad);
            let cy = 552 - b*Math.sin(rad);
            return {cx, cy};
        }

    //Времени
        GetTimePassedPersent(isDay?: boolean){
            const _isDay = isDay ?? this.state.isDay ?? this.isSunDay();
            const secondFromStartTime = this.GetSecondsStartTime2Current();
            let timePassedPercent;
            if(_isDay){
                timePassedPercent = Number(( secondFromStartTime/this.state.dayLength! * 100 ).toFixed()); 
            }else{
                timePassedPercent = Number(( secondFromStartTime/this.state.nightLength! * 100 ).toFixed()); //процент прошедшего времени отноистельно продолжительности ночи
            }
            return timePassedPercent;
        }
        GetGeoLocationInfo(){
            let location : {lat:number, long: number, status:boolean|null, errorText:string|null} = {
                lat: 55.53,
                long: 37.64,
                status: null,
                errorText: null
            };

            try{
                if(!navigator.geolocation){
                    location.status = false;
                    location.errorText = "Ваш бровзер не саппорт геолокацию(( \nИспользовано Мск тайм";
                    // throw new Error(location.errorText);
                }else{
                    navigator.geolocation.getCurrentPosition(success, error);
                }
            }catch(e){
                // CustomError.Disp2Console(`Ошибка в navigator - ${e.message}`);
                console.log(`Ошибка в navigator - ${e.message}`);
            }finally{
                return location;
            }

            function success(position: any){
                location.lat = position.coords.latitude;
                location.long = position.coords.longitude;
                location.status = true;
            }
            function error(e: any){
                location.status = false;
                location.errorText = "чтобы отразить текущие показатели включите геолокацию(default Мск)";
            }
        }
        isSunDay(sunriseTime?:ITime, sunsetTime?:ITime){
            const currentTime = new Date().getTime() / 1000;
            const _sunriseTime = sunriseTime ?? this.state.sunriseTime;
            const _sunsetTime = sunsetTime ?? this.state.sunsetTime;

            if(currentTime >= _sunriseTime.time! && currentTime <= _sunsetTime.time!){
                return true;
            }
            return false;
        }
        GetSecondsStartTime2Current(startTime?: ITime){
            if(startTime === undefined){
                startTime = (this.state.isDay) ? this.state.sunriseTime : this.state.sunsetTime;
            } 
            // return количество секунд, прошедших с sunrise or sunset до текущего момента
            const timeStr = new Date().toLocaleTimeString();
            const currentTime = this.CreateTime(timeStr);
            return currentTime.time! - startTime.time!;
        }
        CreateTime(time : string, isNeedGMT : boolean | undefined = false, isPM: boolean | undefined = undefined) : ITime{
            //isPM передавать только тогда, когда работаем с АПИ погоды или в амерских временых зонах - AM : PM
            const date = new Date();
            const secGMT = isNeedGMT ? date.getTimezoneOffset()*60 : 0; //сдвижка относительно Гринвича
            const timeArr = time.split(':').map(elem => parseInt(elem));
            const h = timeArr[0] - secGMT/3600;
            const hours = isPM ? h + 12 : h;
            const m = timeArr[1];
            
            date.setHours(hours);
            date.setMinutes(m);
            return {
                hours,
                minutes: m,
                time: date.getTime()/1000 //секунды от эпохи динозавров
            };
        }

    //renders
    renderDayReference(){
        const sunPosition = this.state.skyBody.position ?? {cx: 0, cy: 0};
        const sunColor = this.state.skyBody.currentColor ?? "#fff";
        const sunRiseTime = `${this.state.sunriseTime.hours ?? "0"}:${this.state.sunriseTime.minutes ?? "00"}`;
        const sunSetTime = `${this.state.sunsetTime.hours ?? "0"}:${this.state.sunsetTime.minutes ?? "00"}`;
        return(
            <div className="SunMovingReference">
            <SunSvg
                    sunPosition={sunPosition}
                    sunColor={sunColor}
                    sunRiseTime={sunRiseTime}
                    sunSetTime={sunSetTime}
                />
            </div>
        )
    }
    renderNightReference(){
        const sunRiseTime = `${this.state.sunriseTime.hours ?? "0"}:${this.state.sunriseTime.minutes ?? "00"}`;
        const sunSetTime = `${this.state.sunsetTime.hours ?? "0"}:${this.state.sunsetTime.minutes ?? "00"}`;
        const position = this.state.skyBody.position ?? {cx: 0, cy: 0};
        const color = this.state.skyBody.currentColor ?? "#fff";
        return(
            <div className="SunMovingReference">
                <MoonSvg
                    position={position}
                    color={color}
                    sunRiseTime={sunRiseTime}
                    sunSetTime={sunSetTime}
                />
            </div>
        )
    }

}

export default SunMovingReference;