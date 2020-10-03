const stageWidth = 750
const stageHeight = 500

const app = new PIXI.Application({
  width: stageWidth,
  height: stageHeight,
  antialias: true,
  backgroundColor: 0xeeeeeee,
})

const stage = app.stage

document.body.appendChild(app.view)

const headerStyle = new PIXI.TextStyle({
  fontFamily: 'Trebuschet MS',
  fontSize: 36,
	fontWeight: 'bold',
	fill: '0xaa00ff',
	dropShadow: true,
	dropShadowColor: '0xffff00'
})

const header = new PIXI.Text('Bezier curve', headerStyle)
header.x = 275
header.y = 20

function Circle(x, y) {
  const graphics = new PIXI.Graphics()
  graphics.beginFill(0xaa00ff)
  graphics.drawCircle(0, 0, 5)
  graphics.endFill()
  graphics.interactive = true
  graphics.buttonMode = true
  graphics
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove)
  graphics.x = x
  graphics.y = y
  return graphics
}

function onDragStart(event) {
  this.data = event.data
  this.alpha = 0.5
  this.dragging = true
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent)
    this.position.x = newPosition.x
    this.position.y = newPosition.y
  }
}

function onDragEnd() {
  this.alpha = 1
  this.dragging = false
  this.data = null
}

const points = [
  new Circle(50, 60),
  new Circle(50, 475),
  new Circle(700, 60),
	new Circle(700, 475),
]

const bezierCurve = new PIXI.Graphics()
const path = new PIXI.Graphics()

function drawPath(path, points) {
  path.clear()

  path.lineStyle(3, 0xffff00, 1)
	path.moveTo(points[0].x, points[0].y)
	
  for (point of points.slice(1)) {
    path.lineTo(point.x, point.y)
  }
}

function drawBezierCurve(bezierCurve, points) {
	bezierCurve.clear()
	
	bezierCurve.lineStyle(5, 0xaa00ff, 1)
	bezierCurve.moveTo(points[0].x, points[0].y)

  bezierCurve.bezierCurveTo(
    points[1].x,
    points[1].y,
    points[2].x,
    points[2].y,
    points[3].x,
    points[3].y,
  )
}

stage.addChild(path)
stage.addChild(bezierCurve)
stage.addChild(header)
stage.addChild.apply(stage, points)

app.ticker.add(() => {
  drawPath(path, points)
  drawBezierCurve(bezierCurve, points)
})
