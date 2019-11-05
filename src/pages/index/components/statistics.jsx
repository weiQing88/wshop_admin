import { useEffect, useState } from 'react';
import { Card } from 'antd';
import echarts from 'echarts';
import util from '@/util/index';



export default function(){

     let myChart = null;

     let buildChart = () => {
         if( !util.isValid( myChart ) ) myChart = echarts.init(document.getElementById('orders_statistical_chart'));  

         myChart.setOption({
            title: {
                text: '最近7天订单统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['未支付','已支付' ]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
     
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
         
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'未支付',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'已支付',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
               
            ]
        })


   };


    useEffect(() => {
         // 在Card渲染完成后执行
        setTimeout(() => { buildChart() });
        return function(){
            if( myChart ){
                myChart.dispose();
                myChart = null; 
            }
        }
    },[])
      
    return (
       <Card title="订单统计" bordered={false} style={{ width: '49%', float : 'left' }}>
           <div id="orders_statistical_chart" ></div>
        </Card>  
    )
}