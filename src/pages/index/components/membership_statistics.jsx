import { useEffect, useState } from 'react';
import { Card } from 'antd';
import echarts from 'echarts';
import util from '@/util/index';
import echartsThemeJson from './echarts_theme.json';

export default function(){

     let myChart = null;

     let buildChart = () => {
         if( !util.isValid( myChart ) ){
            echarts.registerTheme('echarts_theme', echartsThemeJson );
            myChart = echarts.init(document.getElementById('membership_statistical_chart'), 'echarts_theme');  
         }
         
         myChart.setOption({
            title: {
                text: '最近7天会员统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['新增记录','活跃记录' ]
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
                data: ['23日','24日','25日','26日','27日','28日','29日']
            },
         
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'新增记录',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'活跃记录',
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
       <Card title="会员统计" bordered={false} style={{ width: '49%', float : 'right' }}>
           <div id="membership_statistical_chart" ></div>
        </Card>  
    )
}