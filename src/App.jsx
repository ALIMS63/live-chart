import { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

export const App = () => {
	const [options] = useState({
		chart: {
			events: {
				load: function () {
					// set up the updating of the chart each second
					const series = this?.series?.[0];
					setInterval(function () {
						const x = new Date().getTime(); // current time
						const y = Math.round(Math.random() * 100);
						series.addPoint([x, y], true, true);
					}, 1000);
				},
			},
			color: "white",
			type: "spline",
		},

		time: {
			useUTC: false,
		},

		rangeSelector: {
			buttons: [
				{
					count: 1,
					type: "minute",
					text: "1M",
				},
				{
					count: 5,
					type: "minute",
					text: "5M",
				},
				{
					type: "all",
					text: "All",
				},
			],
			inputEnabled: false,
			selected: 2,
		},

		title: {
			text: "Chart in real time",
		},

		exporting: {
			enabled: false,
		},

		series: [
			{
				name: "point value",
				data: (function () {
					// generate an array of random data
					const time = new Date().getTime();
					let value = 100;

					function generateDatas(count) {
						const data = [];
						for (let i = -count; i <= 0; i += 1) {
							value = Math.round(Math.random() * 10 - 5 + value);
							data.push([time + i * 1000, value]);
						}
						return data;
					}

					return generateDatas(2000);
				})(),
			},
		],
	});

	return (
		<HighchartsReact
			constructorType="stockChart"
			highcharts={Highcharts}
			options={options}
		/>
	);
};
