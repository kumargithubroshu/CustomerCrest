import { Component } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Stage } from 'konva/lib/Stage';
import { Circle } from 'konva/lib/shapes/Circle';
import { Ellipse } from 'konva/lib/shapes/Ellipse';
import { Line } from 'konva/lib/shapes/Line';
import { Path } from 'konva/lib/shapes/Path';
import { Rect } from 'konva/lib/shapes/Rect';
import { RegularPolygon } from 'konva/lib/shapes/RegularPolygon';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent {

  shape: any;

  isrectangle: boolean = false;
  issquare: boolean = false;
  isellipse: boolean = false;
  iscircle: boolean = false;
  istriangle: boolean = false;
  isline: boolean = false;
  isdrawing: boolean = false;

  color: any = "black";
  fillbool: boolean = false;
  borderbool: boolean = false;
  // flagcopy: boolean = false;

  count: number = 0;
  deleteElement: any = false;
  delete: boolean = false;

  x1: any = 0;
  y1: any = 0;
  x2: any = 0;
  y2: any = 0;

  path: any = '';

  elements = new Map();
  redo_flag: boolean = false;
  undo_flag: boolean = false;
  load_flag: boolean = false;

  back: any;
  stage!: Stage;
  layer!: Layer;

  tr = new Konva.Transformer();

  selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.1)',
    visible: false,
  });

  resetBool() {
    this.isrectangle = false, this.issquare = false, this.isellipse = false, this.iscircle = false,
      this.istriangle = false, this.isline = false, this.redo_flag = false, this.fillbool = false,
      this.borderbool = false; this.delete = false, this.deleteElement = false;
  }

  ngOnInit(): void {
    this.stage = new Stage({
      container: 'drawing-field',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.layer = new Layer();
    this.stage.add(this.layer);
  }

  setdel(bool: any) {
    this.deleteElement = bool;
  }

  rectangle() {
    this.resetBool();
    this.isrectangle = true;
  }
  square() {
    this.resetBool();
    this.issquare = true;
  }
  ellipse() {
    this.resetBool();
    this.isellipse = true;
  }
  circle() {
    this.resetBool();
    this.iscircle = true;
  }
  triangle() {
    this.resetBool();
    this.istriangle = true;
  }
  line()
  {
    this.resetBool();
    this.isline = true;
  }

  deleteAll() {
    this.resetBool();
    this.delete = true;
    this.layer.destroyChildren();
    this.layer.destroy();
    this.stage.destroy();
    this.ngOnInit();
    this.tr = new Konva.Transformer();
  }

  draw_shape() {
    if (this.isrectangle) {
      this.count += 1;
      let rect: Rect;
      rect = new Konva.Rect({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        width: 100,
        height: 50,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'rectangle',
        id: String(this.count),
      });
      this.shape = rect;
      this.layer.add(rect).batchDraw();
      this.select(rect);

    } else if (this.issquare) {
      this.count += 1;
      let square: Rect;
      square = new Konva.Rect({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'rectangle',
        id: String(this.count),
      });
      this.shape = square;
      this.layer.add(square).batchDraw();
      this.select(square);

    } else if (this.isellipse) {
      this.count += 1;
      let ellipse: Ellipse;
      ellipse = new Konva.Ellipse({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        radiusX: 60,
        radiusY: 30,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'ellipse',
        id: String(this.count),
      });
      this.shape = ellipse;
      this.layer.add(ellipse).batchDraw();
      this.select(ellipse);

    } else if (this.iscircle) {
      this.count += 1;
      let circle: Circle;
      circle = new Konva.Circle({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        radius: 60,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'circle',
        id: String(this.count),
      });
      this.shape = circle;
      this.layer.add(circle).batchDraw();
      this.select(circle);

    } else if (this.istriangle) {
      this.count += 1;
      let triangle: RegularPolygon;
      triangle = new Konva.RegularPolygon({
        x: this.stage.getPointerPosition()?.x,
        y: this.stage.getPointerPosition()?.y,
        sides: 3,
        radius: 50,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true,
        name: 'triangle',
        id: String(this.count),
      });
      this.shape = triangle;
      this.layer.add(triangle).batchDraw();
      this.select(triangle);

    } else if (this.isline) {
       this.count += 1;
       let line: Line;
       if (!this.isdrawing) {
        this.isdrawing = true;
        this.x1 = this.stage.getPointerPosition()?.x;
        this.y1 = this.stage.getPointerPosition()?.y;
       } else {
        this.x2 = this.stage.getPointerPosition()?.x;
        this.y2 = this.stage.getPointerPosition()?.y;
        line = new Konva.Line({
         points: [this.x1, this.y1, this.x2, this.y2],
         strokeWidth: 2,
         stroke: 'black',
         width: this.x2,
         height: this.y2,
         draggable: true,
         name: 'line',
         id: String(this.count),
        });
        this.layer.add(line).batchDraw();
        this.isdrawing = false;
        (this.isline = false), (this.redo_flag = false);
        this.select(line);
       }
      }
      (this.isrectangle = false),
      (this.issquare = false),
      (this.isellipse = false),
      (this.iscircle = false),
      (this.istriangle = false);
      (this.isline = false)
  }
  select(shape: Shape) {
    this.layer.add(this.tr);
    shape.on('transform', () => {
      shape.setAttrs({
        width: Math.max(shape.width() * shape.scaleX(), 5),
        height: Math.max(shape.height() * shape.scaleY(), 5),
        scaleX: 1,
        scaleY: 1,
      });
    });
    this.tr.nodes([shape]);
    this.layer.add(this.selectionRectangle);
    var x: any, y: any, x2: any, y2: any;
    this.stage.on('mousedown touchstart', (e: { target: any; evt: any }) => {
      if (e.target !== this.stage) {
        return;
      }
      e.evt.preventDefault();
      x = this.stage.getPointerPosition()?.x;
      y = this.stage.getPointerPosition()?.y;
      x2 = this.stage.getPointerPosition()?.x;
      y2 = this.stage.getPointerPosition()?.y;
      this.selectionRectangle.visible(true);
      this.selectionRectangle.width(0);
      this.selectionRectangle.height(0);
    });
    this.stage.on('mousemove touchmove', (e: { target: any; evt: any }) => {
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = this.stage.getPointerPosition()?.x;
      y2 = this.stage.getPointerPosition()?.y;
      this.selectionRectangle.setAttrs({
        x: Math.min(x, x2),
        y: Math.min(y, y2),
        width: Math.abs(x2 - x),
        height: Math.abs(y2 - y),
      });
    });
    this.stage.on('mouseup touchend', (e: { target: any; evt: any }) => {
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      setTimeout(() => {
        this.selectionRectangle.visible(false);
      });
      var shaperec = this.stage.find(".rectangle");
      var shapeell = this.stage.find(".ellipse");
      var shapecirc = this.stage.find(".circle");
      var shapetri = this.stage.find(".triangle");
      var shapeline = this.stage.find(".line");
      var shapes = shaperec.concat(shapeell, shapecirc, shapetri, shapeline);
      var box = this.selectionRectangle.getClientRect();
      var selected: any = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      this.tr.nodes(selected);
      if (this.deleteElement) {
        this.setdel(false);
      }
    });
    let s: any = this.stage;
    this.stage.on('click tap', (e: { target: any; evt: { shiftKey: any; ctrlKey: any; metaKey: any }; }) => {
      if (this.selectionRectangle.visible()) {
        return;
      }
      if (e.target === s) {
        this.tr.nodes([]);
        return;
      }
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.tr.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        this.tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        const nodes = this.tr.nodes().slice(); 
        nodes.splice(nodes.indexOf(e.target), 1);
        this.tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        const nodes = this.tr.nodes().concat([e.target]);
        this.tr.nodes(nodes);
      }
      if (this.deleteElement) {
        this.setdel(false);
      }

    }
    );
    this.stage = s;
  }
  

  

}
