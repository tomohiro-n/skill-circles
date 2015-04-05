/// <reference path="../../../typings/tsd.d.ts" />

module skillCircles {
	'use strict';
	export class D3Service {

		static format : (value : number) => string = d3.format(',d');
		static pathStrOffset : number = 20;
		diameter : number = 960;
		mainChart : D3.Selection = d3.select('#main-chart');

		drawCircles(root? : any) {
			if (root) {
				this._draw(root);
			} else {
				d3.json('../../assets/json/data.json', (error:any, theRoot:any) => {
					this._draw(theRoot);
				});
			}
		}

		private _draw(root : any) {

			var pack = d3.layout.pack()
				.size([this.diameter - 4, this.diameter - 4 - D3Service.pathStrOffset * 2])
				.value((d:D3.Layout.GraphNode) => {
					return d.size;
				});

			this.mainChart.selectAll('svg').remove();

			var svg = this.mainChart.append('svg')
				.attr('viewBox', '0 0 ' + this.diameter + ' ' + this.diameter)
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.append('g')
				.attr('transform', 'translate(2,2)');

			svg.append('text')
				.attr('x', this.diameter / 2)
				.attr('y', D3Service.pathStrOffset)
				.attr('text-anchor', 'middle')
				.style('font-size', '25px')
				.on('click', (d:any) => {
					this.drawCircles();
				})
				.text(root.name);

			var node = svg.datum(root).selectAll('.node  ')
				.data(pack.nodes)
				.enter().append('g')
				.attr('class', (d: D3.Layout.GraphNode) => {
					return d.children ? 'node' : 'leaf node';
				})
				.attr('transform', (d:any) => {
					return 'translate(' + d.x + ',' + (d.y + D3Service.pathStrOffset * 2) + ')';
				});

			node.append('title')
				.text((d:any) => {
					return d.name + (d.children ? '' : ': ' + D3Service.format(d.size));
				});

			node.append('circle')
				.attr('r', (d:any) => {
					return d.r;
				});

			node.on('click', (d:any) => {
					this._draw(d);
				}
			);

			node.filter((d:any) => {
				return !d.children;
			}).append('text')
				.attr('dy', '.3em')
				.style('text-anchor', 'middle')
				.text((d:any) => {
					return d.name.substring(0, d.r / 3);
				});

			d3.select(self.frameElement).style('height', this.diameter + 'px');
		}
	}
}
