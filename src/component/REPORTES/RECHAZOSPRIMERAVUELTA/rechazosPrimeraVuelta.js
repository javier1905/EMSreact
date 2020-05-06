import React , { useState , useEffect , useRef }  from 'react'
import MyComponent from '../../AAprimary/misComponentes'
import Servicios from '../serviceReportes'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import servicios from '../serviceReportes'
import Moment from 'moment'


const RechazosPrimeraVuelta = ( props ) => {
    const [fechaFundicionDesde , setFechaFundicionDesde] = useState ( new Moment (`${new Date (  ).getFullYear (  )}-01-01T00:00:00.000`).format ( 'YYYY-MM-DDTHH:MM:ss.sss' ) )
    const [fechaFundicionHasta , setFechaFundicionHasta] = useState ( new Date () )
    const [idMaquina , setIdMaquina] = useState ( '' )
    const [idPieza , setIdPieza] = useState ( '' )
    const [idMolde , setIdMolde] = useState ( '' )
    const [vecMaquinas , setVecMaquinas] = useState ( [  ] )
    const [vecPiezas , setVecPiezas] = useState ( [  ] )
    const [vecMoldes , setVecMoldes] = useState ( [  ] )
    const [vecFechas , setVecFechas] = useState ( [  ] )
    const [vecProduccion , setVecProduccion] = useState ( [  ] )
    const [vecRechazos , setVecRechazos] = useState ( [  ] )
    const [vecPorcentajes , setVecPorcentajes] = useState ( [  ] )
    const refGrafico = useRef (  )
    useEffect ( (  ) => {
        const getServicios = async (  ) => {
            const vecMaq = await Servicios.listaMaquinas (  )
            const vecPie = await Servicios.listaPiezas (  )
            if ( vecMaq ) { setVecMaquinas ( vecMaq ) }
            if ( vecPie ) { setVecPiezas ( vecPie ) }
        }
        getServicios (  )
        try { refGrafico.plugins.unregister ( ChartDataLabels ) } catch ( e ) {  }
    } , [props] )
    useEffect ( (  ) => {
        const getMol = async (  ) => {
            const vecMol = await Servicios.listaMoldes ( idPieza )
            if ( vecMol ) { setVecMoldes ( vecMol ) }
        }
        getMol (  )
    } , [ idPieza ] )
    useEffect ( (  ) => {
        const getDatosRechazos = async (  ) => {
            const result = await servicios.listaReporteRechazosPrimeraVuelta ( fechaFundicionDesde , fechaFundicionHasta , idMaquina === '' ? null : idMaquina , idPieza === '' ? null : idPieza , idMolde === '' ? null : idMolde )
            if ( result  ) {
                setVecFechas ( result.vecFechas )
                setVecProduccion ( result.vecProduccion )
                setVecRechazos ( result.vecRechazos )
                setVecPorcentajes ( result.vecPorcentaje )
            }
        }
        getDatosRechazos (  )
    } , [fechaFundicionDesde , fechaFundicionHasta , idMaquina , idPieza , idMolde] )
    const datos = {
        labels : vecFechas ,
        datasets : [
            {
                datalabels : {
                    color : 'black' ,
                    display : true ,
                    borderColor : {
                        color : '#34B84E'
                    },
                    font : {
                        size : 18
                    }
                } ,
                type : 'line' ,
                data : vecPorcentajes ,
                yAxisID : 'id_escala_derecha' ,
                backgroundColor : '#34B84E' ,
                borderColor : '#34B84E' ,
                label : 'Prosentajes'
            } ,
            {
                datalabels: {
                    color : 'white' ,
                    display : true ,
                    font : {
                        size : 18
                    }
                } ,
                type : 'bar' ,
                data : vecProduccion ,
                label : 'Producion' ,
                backgroundColor : 'rgb(55, 49, 138)' ,
                yAxisID : 'id_escala_izquierda'
            },
            {
                datalabels: {
                    color : 'black' ,
                    display : true ,
                    font : {
                        size : 18
                    }
                } ,
                type : 'bar' ,
                data : vecRechazos ,
                yAxisID : 'id_escala_izquierda' ,
                backgroundColor : '#C42722' ,
                label : 'Rechazos'
            }
        ]
    }
    const opciones = {
        plugins: {
            datalabels : {
                color : 'black' ,
                display : false
            }
        } ,
        tooltips : {
            model : 'label'
        } ,
        title : {
            text : 'Rechazos de primera vuelta' ,
            display : true ,
            fontSize : 30
        } ,
        responsive : true ,
        legend : {
            display : true ,
            position : 'bottom' ,
            labels : {
                padding : 30 ,
                fontColor : 'black'
            }
        } ,
        elements : {
            point : {
                radius : 3
            } ,
            line : {
                fill : false ,
                tension : 0
            }
        } ,
        scales : {
            xAxes : [
                {
                    display : true ,
                    ticks: {
                        // max: 5,
                        // min: 0,
                        stepSize: 4
                    } ,
                    gridLines : {
                        display : false
                    }
                }
            ] ,
            yAxes : [
                {
                    type : 'linear' ,
                    display : true ,
                    position : 'left' ,
                    id : 'id_escala_izquierda' ,
                    gridLines : {
                        display : true
                    } ,
                    labels : {
                        show : true
                    } ,
                    ticks : {
                        min : 0
                    }
                } ,
                {
                    type : 'linear' ,
                    display : true ,
                    position : 'right' ,
                    id : 'id_escala_derecha' ,
                    gridLines : {
                        display : true
                    } ,
                    labels : {
                        show : true
                    } ,
                    ticks : {
                        min : 0 ,
                        stepSize: 200
                    }
                }
            ]
        }
    }
    const plugins = [
        { ChartDataLabels }
    ]
    return (
        <div>
            <div className = 'containerFilter' >
                <MyComponent.fecha id = 'fechaFunDesde' label ='Fecha Fun Desde' value = { fechaFundicionDesde } onChange = { e => setFechaFundicionDesde ( e ) } />
                <MyComponent.fecha id = 'fechaFunHasta' label ='Fecha Fun Hasta' value = { fechaFundicionHasta } onChange = { e => setFechaFundicionHasta ( e ) } />
                <MyComponent.listaDesplegable
                    label = 'Maquina'
                    value = { idMaquina }
                    onChange = { e => setIdMaquina ( e.target.value ) }
                    array = { vecMaquinas }
                    member = { { valueMember : 'idMaquina' , displayMember : 'nombreMaquina' } }
                />
                <MyComponent.listaDesplegable
                    label = 'Pieza'
                    value = { idPieza }
                    onChange = { e => setIdPieza ( e.target.value ) }
                    array = { vecPiezas }
                    member = { { valueMember : 'idPieza' , displayMember : 'nombrePieza' } }
                />
                <MyComponent.listaDesplegable
                    label = 'Molde'
                    value = { idMolde }
                    onChange = { e => setIdMolde ( e.target.value ) }
                    array = { vecMoldes }
                    member = { { valueMember : 'idMolde' , displayMember : 'nombreMolde' } }
                />
            </div>
            <div className = 'containerGrafico'>
                <Bar
                    ref = { refGrafico }
                    data = { datos }
                    options = { opciones }
                    plugins = { plugins }
                />
            </div>
        </div>
    )
}

export default RechazosPrimeraVuelta