import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js"

ChartJs.register( ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)
const Chart = ({arr=[],currency,days}) => {

     const prices=[1,2,3,4]
     const date=["12/2/22","23/2//23","32/2/23"]

  return (
           <Line options={{responsive:true,}} data={{labels:date,datasets:[{
            label:`price in currency `
                     }]}}
            />
  )
}

export default Chart