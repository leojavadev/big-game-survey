import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters';
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers';

//Integração com a API
import Axios from 'axios';

import './styles.css';

type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = 'http://localhost:8080'

const Charts = () => {

    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData); 

    //Integração com a API
    useEffect(() => {
        async function getData(){
            const recordsResponse = await Axios.get(`${BASE_URL}/records`);
            const gamesResponse = await Axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genderChartData = getGenderChartData(recordsResponse.data.content);
            setGenderData(genderChartData);
            
            //console.log(recordsResponse.data);
        }
        getData();
    }, [])

    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA" />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais Votados
                    </h1>
                    <div className="games-container">
                        <Chart
                            options={barOptions}
                            type="bar"
                            width="900"
                            height="400"
                            series={[{ data: barChartData }]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataformas</h2>
                        <Chart 
                            options={{ ...pieOptions, labels: platformData?.labels}}
                            type="donut"
                            width="350"
                            series={platformData?.series}
                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gêneros</h2>
                        <Chart 
                            options={{ ...pieOptions, labels: genderData?.labels}}
                            type="donut"
                            width="350"
                            series={genderData?.series}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts;