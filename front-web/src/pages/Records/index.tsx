import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from './helpers';
import { RecordsResponse } from './types';
import Pagination from './Pagination';
import Filters from '../../components/Filters';
import './styles.css';
import { link } from 'fs';

const BASE_URL = 'http://localhost:8080'

const Records = () => {

    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>();

    const [ activePage, setActivePage ] = useState(0);

    const handlePageChange = (index: number) => {
        setActivePage(index)
    }

    useEffect(() => {
        //console.log('componente iniciado');
        //console.log(recordsResponse);
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));
    }, [activePage]); 

    return (
        <div className="page-container">
            <Filters link="/charts" linkText="VER GRÁFICO" />
            <table className="records-table" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>
                <tbody>
                    {recordsResponse?.content.map(record => (
                        <tr key={record.id}>
                            <td>{formatDate(record.moment)}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                            <td className="text-secondary">{record.gamePlatform}</td>
                            <td>{record.genderName}</td>
                            <td className="text-primary">{record.gameTitle}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
            <Pagination 
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    );
}

export default Records;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          