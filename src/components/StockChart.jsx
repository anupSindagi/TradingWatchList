import Chart from "react-apexcharts"
import {useState} from "react"

export const StockChart = ({chartData, symbol}) => {
    const {day, week, year} = chartData;
    const [duration, setDuration] = useState(day);

    const options = {
        colors : duration[duration.length-1].y - duration[0].y >= 0 ? ["#22c55e"] : ["#ef4444"],
        title : {
            text : symbol,
            align : "center",
            style : {
                fontSize : "18px",
                color : "#0284c7"
            }
        },
        chart : {
            id: "stock data",
            animations : {
                speed : 1300
            }
        },
        xaxis : {
            type : "datetime",
            labels : {
                dateTimeUTC : false
            }
        },
        tooltip : {
            x : {
                format: "MMM dd HH:MM"
            }
        }
    }
    const series = [{
        name : symbol,
        data : duration
    }]
    
    return(
        <div className="self-center w-[100vh] h-[100vh] my-7">
            <Chart options={options} series={series} type="area"/>
            <div className="flex justify-center space-x-1 text-sky-600">
                <button 
                    className={`border-2 border-sky-200 ${duration[0].x == day[0].x ? `bg-sky-200` : `bg-sky-100`} rounded-l-xl pl-2 p-1 shadow transition duration-100 hover:scale-[0.95] hover:bg-sky-200`}
                    onClick={() => setDuration(day)}
                    >day</button>
                <button 
                    className={`border-2 border-sky-200 ${duration[0].x == week[0].x ? `bg-sky-200` : `bg-sky-100`} p-1 shadow transition duration-100 hover:scale-[0.95] hover:bg-sky-200`}
                    onClick={() => setDuration(week)}
                    >week</button>
                <button 
                    className={`border-2 border-sky-200 ${duration[0].x == year[0].x ? `bg-sky-200` : `bg-sky-100`} rounded-r-xl pr-2 p-1 shadow shadow transition duration-100 hover:scale-[0.95] hover:bg-sky-200`}
                    onClick={() => setDuration(year)}
                    >year</button>
            </div>
        </div>
    )
}