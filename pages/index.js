import React, { useState, useEffect } from 'react'
import { Line, defaults } from "react-chartjs-2";
import mqtt from "mqtt";
import Head from 'next/head'
import axios from "axios";
import Footer from '../components/Footer'

const Home = (props) => {

	const [top, setTop] = useState('nada');
	const [topicos, setTopicos] = useState(props.data);
	const [chartData, setChartData] = useState({});
	const [active, setactive] = useState(true);

	const options = {
		connectTimeout: 4000,
		clientId: 'cliente' + new Date().getUTCMilliseconds(),
		keepalive: 60,
		clean: true
	}

	useEffect(() => {
		/* console.log(active ? 'activo' : 'desactivo') */
		const client = mqtt.connect('ws://18.191.153.104:8083/mqtt', options)


		client.on('connect', () => {
			client.subscribe('GPIO', function (err) {
				if (err) {
					console.log('error al conectar al topic')
				}
			})
		})

		client.on('message', (topic, message) => {
			setTop(message.toString())
			/* if (!active) {
			  console.log('intentado desconectar')
			  client.end(true)
			} */
		})

	}, [/* active */]);


	useEffect(() => {

		console.log(top)

		let array = topicos

		for (let i = array.length - 1; i >= 0; i--) {
			if (i !== 0) {
				array[i] = array[i - 1]
			} else {
				if (!isNaN(parseFloat(top))) {
					array[i] = parseFloat(top)
				}
			}
		}
		setTopicos(array)

		setChartData({
			labels: ['0s', '-1s', '-2s', '-3s', '-4s', '-5s', '-6s', '-7s', '-8s', '-9s', '-10s', '-11s', '-12s', '-13s', '-14s', '-15s', '-16s', '-17s', '-18s', '-19s'],
			datasets: [
				{
					label: 'Distancia [cm]',
					data: array,
					backgroundColor: ['rgba(75, 192, 192, 0.5)'],
					borderWidth: 4,
				}
			]
		})
		console.log(array)

		defaults.global.animation = false;

	}, [top]);

	const handleMongo = async () => {
		setactive(!active)
		const url = '/api/mqtt'
		const res = await axios.post(url, { active })
		console.log(res)
	}

	return <div className="content">
		<Head>
			<title>{top}</title>
			<link rel="icon" href="/favicon.ico" />
			<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"> </script>
		</Head>
		<div style={{width: '1200px', margin: 'auto'}}>

			<h1>DistaNet</h1>
			<h2>Distancia En Tiempo Real</h2>
			<br/><br/><br/>
			<div style={{width: '100%'}}>
				<div className="cont">
					<div className="punto"></div>
					<div className="regla">

						<span className="dist cero"> <br/>0</span>
						<span className="dist cero1"> <br/>1</span>
						<span className="dist cero2"> <br/>2</span>
						<span className="dist cero3"> <br/>3</span>
						<span className="dist cero4"> <br/>4</span>
						<span className="dist cero5"> <br/>5</span>
						<span className="dist cero6"> <br/>6</span>
						<span className="dist cero7"> <br/>7</span>
						<span className="dist cero8"> <br/>8</span>
						<span className="dist cero9"> <br/>9</span>
						<span className="dist diez"> <br/>10</span>
						<span className="dist diez1"><br/>11</span>
						<span className="dist diez2"><br/>12</span>
						<span className="dist diez3"><br/>13</span>
						<span className="dist diez4"><br/>14</span>
						<span className="dist diez5"><br/>15</span>
						<span className="dist diez6"><br/>16</span>
						<span className="dist diez7"><br/>17</span>
						<span className="dist diez8"><br/>18</span>
						<span className="dist diez9"><br/>19</span>
						<span className="dist veinte"><br/> 20</span>
						<span className="dist veinte1"><br/> 21</span>
						<span className="dist veinte2"><br/> 22</span>
						<span className="dist veinte3"><br/> 23</span>
						<span className="dist veinte4"><br/> 24</span>
						<span className="dist veinte5"><br/> 25</span>
						<span className="dist veinte6"><br/> 26</span>
						<span className="dist veinte7"><br/> 27</span>
						<span className="dist veinte8"><br/> 28</span>
						<span className="dist veinte9"><br/> 29</span>
						<span className="dist treinta"> <br/> 30</span>
						<span className="dist treinta1"><br/> 31</span>
						<span className="dist treinta2"><br/> 32</span>
						<span className="dist treinta3"><br/> 33</span>
						<span className="dist treinta4"><br/> 34</span>
						<span className="dist treinta5"><br/> 35</span>
						<span className="dist treinta6"><br/> 36</span>
						<span className="dist treinta7"><br/> 37</span>
						<span className="dist treinta8"><br/> 38</span>
						<span className="dist treinta9"><br/> 39</span>
						<span className="dist cuarenta"><br/> 40</span>
					</div>
				</div>
			</div>
		<br/>
			<h2>Historial De Distancias</h2>

			<div className="line">
				<Line data={chartData} redraw={true} options={{
					scales: {
						yAxes: [{
							ticks: {
								max: 40,
								min: 0,
								stepSize: 5
							}
						}]
					},
					maintainAspectRatio: false
				}} />
			</div>

			<button onClick={handleMongo}>Activar</button>
			<Footer />
		</div>


		<style jsx>{`	

			:globla(body) {
				background: linear-gradient(180deg, #4ecdc499 0%, #4ecdc499 100%);
			}

			h1 {
				text-align: center;
				background: rgba(75, 192, 192, 0.8);
				margin: 50px auto;
				width: 200px;
				padding: 10px;
				border-radius: 35px;
				color: white;
				font-size: 50px;
				margin-bottom: 100px;
			}

			h2 {
				color: white;
				background: rgba(75, 192, 192, 0.8);
				width: 270px;
				text-align: center;
				margin: 50px auto;
				border-radius: 20px;
				padding: 10px;
			}

			.cont {
				position: relative;
				width: 1200px;
				margin: auto;
			}

			.punto {
				position: absolute;
				top: -40px;
				right: 0;
				width: 3px;
				height: 40px;
				background: blue;
				transition: transform .5s;
				transform: translateX(-${top * 30}px);
			}

			.dist {
				position: absolute;
				display: inline-block;
				right: 300px;
				width: 2px;
				height: 20px;
				background: white;
				font-size: 16px;
			}
			.cero {
				right: 0px;
			}
			.cero1 {
				right: 30px;
			}
			.cero2 {
				right: 60px;
			}
			.cero3 {
				right: 90px;
			}
			.cero4 {
				right: 120px;
			}
			.cero5 {
				right: 150px;
			}
			.cero6 {
				right: 180px;
			}
			.cero7 {
				right: 210px;
			}
			.cero8 {
				right: 240px;
			}
			.cero9 {
				right: 270px;
			}

			.diez1 {
				right: 330px;
			}
			.diez2 {
				right: 360px;
			}
			.diez3 {
				right: 390px;
			}
			.diez4 {
				right: 420px;
			}
			.diez5 {
				right: 450px;
			}
			.diez6 {
				right: 480px;
			}
			.diez7 {
				right: 510px;
			}
			.diez8 {
				right: 540px;
			}
			.diez9 {
				right: 570px;
			}

			.veinte {
				right: 600px;
			}
			.veinte1 {
				right: 630px;
			}
			.veinte2 {
				right: 660px;
			}
			.veinte3 {
				right: 690px;
			}
			.veinte4 {
				right: 720px;
			}
			.veinte5 {
				right: 750px;
			}
			.veinte6 {
				right: 780px;
			}
			.veinte7 {
				right: 810px;
			}
			.veinte8 {
				right: 840px;
			}
			.veinte9 {
				right: 870px;
			}

			.treinta {
				right: 900px;
			}
			.treinta1 {
				right: 930px;
			}
			.treinta2 {
				right: 960px;
			}
			.treinta3 {
				right: 990px;
			}
			.treinta4 {
				right: 1020px;
			}
			.treinta5 {
				right: 1050px;
			}
			.treinta6 {
				right: 1080px;
			}
			.treinta7 {
				right: 1110px;
			}
			.treinta8 {
				right: 1140px;
			}
			.treinta9 {
				right: 1170px;
			}

			.cuarenta {
				right: 1200px;
			}


			.regla {
				position: relative;
				width: 1200px;
				height: 100px;
				background: rgba(75, 192, 192);
			}

			.line {
				margin: auto;
				width: 1200px;
				height: 500px;
			}

			:global(*) {
				margin: 0;
				padding: 0;
			}

			.content {
				
			}  

			button {
				border: none;
				padding: 10px 20px;
				color: white;
				background: rgba(75, 192, 192, 0.6);
				border-radius: 20px;
				outline: none;
				cursor: pointer;
				transition: background .5s;
			}

			button:hover {
				background: rgba(75, 192, 192);
			}
		
    	`}</style>
	</div>
}

export default Home

export const getServerSideProps = async () => {
	const url = 'http://localhost:3000/api/sensor'
	const res = await axios.get(url)


	let sensorData = res.data.response.slice(0, 20)
	let distancia = []

	for (const dat of sensorData) {
		distancia.push(parseFloat(dat.distancia))
	}


	return { props: { data: distancia } }
}
