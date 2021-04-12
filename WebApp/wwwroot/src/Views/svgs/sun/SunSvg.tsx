import React from 'react';

interface Iprops{
    sunPosition: {
        cx: number| null,
        cy: number| null,
    };
    sunColor: string;
    sunSetTime: string;
    sunRiseTime: string;
}

const SunSvg = (props: Iprops) =>{
    const cx = props.sunPosition.cx ?? 0;
    const cy = props.sunPosition.cy ?? 0;

    return(
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1576.81 701.69">
                
        <defs>
            <radialGradient id="grad1" cx={cx} cy={cy} r="266.94" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={props.sunColor} stopOpacity="100%" />
                <stop offset="35%" stopColor={props.sunColor} stopOpacity="53%"/>
                <stop offset="60%" stopColor={props.sunColor} stopOpacity="30%"/>
                <stop offset="87%" stopColor={props.sunColor} stopOpacity="8%"/>
                <stop offset="100%" stopColor={props.sunColor} stopOpacity="0%"/>
            </radialGradient>
        </defs>
        <g id="Time">
            <text id="Evning" transform="translate(122.14 691.19)" fontSize="60"className="abstraction-black-color"  fontFamily="MyriadPro-Regular, Myriad Pro">{props.sunRiseTime}</text>
            <text id="Morning" transform="translate(1373.13 691.19)" fontSize="60" className="abstraction-black-color"  fontFamily="MyriadPro-Regular, Myriad Pro">{props.sunSetTime}</text>
        </g>
        <g id="trajector" offset="0.1">
            <path id="_trajector_" d="M309.83,708S432.26,383.92,936.19,383.92,1582.13,708,1582.13,708" transform="translate(-153.77 -116.98)" opacity="0" stroke="#1d1d1b" strokeMiterlimit="10" strokeWidth="0.75"/>
        </g>
        <g id="SunRise">
            <path d="M349.21,722.48H271.08c-3.22,0-3.22,5,0,5h78.13c3.21,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M334.8,737.29H284.25c-3.22,0-3.23,5,0,5H334.8c3.22,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M322,752.78H298.31c-3.21,0-3.22,5,0,5H322c3.22,0,3.23-5,0-5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M156.8,710.48H451c4,0,7.95.07,11.92,0h.52c3.22,0,3.23-5,0-5H169.25c-4,0-7.95-.08-11.93,0h-.52c-3.21,0-3.22,5,0,5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M312,595.25V517.12c0-3.22-5-3.22-5,0v78.13c0,3.22,5,3.22,5,0Z" transform="translate(-153.77 -116.98)"className="abstraction-white-color" />
            <path d="M258,615.38l-18.67-18.67L209.56,567l-6.83-6.82c-2.27-2.28-5.81,1.25-3.53,3.53l18.67,18.67,29.75,29.75,6.82,6.83c2.28,2.28,5.82-1.26,3.54-3.54Z" transform="translate(-153.77 -116.98)"className="abstraction-white-color" />
            <path d="M364.6,618.92l18.67-18.67L413,570.5l6.83-6.83c2.27-2.28-1.26-5.81-3.54-3.53l-18.67,18.67-29.75,29.75-6.82,6.82c-2.28,2.28,1.25,5.82,3.53,3.54Z" transform="translate(-153.77 -116.98)"className="abstraction-white-color" />
            <path d="M234.31,667.81H156.18c-3.21,0-3.22,5,0,5h78.13c3.22,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)"className="abstraction-white-color" />
            <path d="M384.74,672.81h78.12c3.22,0,3.23-5,0-5H384.74c-3.22,0-3.23,5,0,5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <g>
            <path d="M359.88,708a62.79,62.79,0,1,0-100.72,0Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M362,709.24a65.29,65.29,0,1,0-117.65-43.32,64.89,64.89,0,0,0,4.05,27.63,65.58,65.58,0,0,0,6.48,12.71c1,1.54,2.23,4.1,4.26,4.22h.36c5.6.13,11.23,0,16.84,0h83.5c3.22,0,3.22-5,0-5H263.26c-1.29,0-2.64-.11-3.92,0h-.18l2.16,1.24a60.33,60.33,0,1,1,100.51-6.26,63,63,0,0,1-4.11,6.26,2.52,2.52,0,0,0,.9,3.42A2.56,2.56,0,0,0,362,709.24Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color"/>
            </g>
        </g>
        <g id="FullSun" opacity="0.9">
            <circle id="_Sun_gradient_" className="SunPosition" cx={cx} cy={cy} r="266.94"  fill="url(#grad1)"/>
            <g id="_Sun_round_" data-name="&lt;Sun_round&gt;" fill="white" stroke="white" opacity="0.1">
            <circle className="SunPosition" cx={cx} cy={cy} color={props.sunColor} r="62.79" />
            </g>

        </g>
        <g id="SunDown">
            <path d="M1613.89,722.48h-78.13c-3.21,0-3.22,5,0,5h78.13c3.22,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M1599.48,737.29h-50.55c-3.22,0-3.22,5,0,5h50.55c3.22,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)"className="abstraction-white-color" />
            <path d="M1586.66,752.78H1563c-3.22,0-3.23,5,0,5h23.66c3.21,0,3.22-5,0-5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M1421.49,710.48h294.23c4,0,8,.07,11.93,0h.52c3.21,0,3.22-5,0-5H1433.94c-4,0-8-.08-11.93,0h-.52c-3.22,0-3.23,5,0,5Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <g>
            <path d="M1637.62,708A62.79,62.79,0,0,0,1512,708Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color" />
            <path d="M1640.12,708a65.46,65.46,0,0,0-12-37.58,65.28,65.28,0,0,0-71.1-25.11,65.38,65.38,0,0,0-47.26,57.62q-.21,2.52-.21,5.07a2.53,2.53,0,0,0,2.5,2.5h110.17c5,0,10.14.17,15.2,0h.21c3.21,0,3.22-5,0-5H1517.19c-1.63,0-3.32-.13-4.94,0H1512l2.5,2.5a60.29,60.29,0,0,1,106.74-38.31,60,60,0,0,1,13.64,33.41c.13,1.63.19,3.26.2,4.9C1635.13,711.19,1640.13,711.2,1640.12,708Z" transform="translate(-153.77 -116.98)" className="abstraction-white-color"/>
            </g>
        </g>
    </svg>
    )
}

export default SunSvg;