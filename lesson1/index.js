let canvas = document.createElement("canvas");

document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 480;
canvas.style["image-rendering"] = "pixelated";

const bunnyImg = new Image();
bunnyImg.src = "https://pixijs.io/examples/examples/assets/bunny.png";

const ctx = canvas.getContext("2d")

let phase = 0
const entities = []
let oldBunny = {}

class Hex {
    constructor(center, x , y) {
        this.hasBunny = 0
        this.center = center
        this.q = x
        this.r = y
        this.target = 0
    }

    hex_corner(center, size, i){
        const angle_deg = 60 * i   + 30
        const angle_rad = Math.PI / 180 * angle_deg
        return {x:center.x + size *  Math.sin(angle_rad), y:center.y + size * Math.cos(angle_rad)}
    }

    render() {
        ctx.fillStyle = "black"
        ctx.beginPath()
        let point = this.hex_corner({x: this.center.x, y: this.center.y}, 20, 0)
        ctx.moveTo( point.x,  point.y)
        for( let i = 1; i < 6; i++) {
            point = this.hex_corner({x: this.center.x, y: this.center.y}, 20, i)
            ctx.lineTo(point.x,  point.y)
        }
        ctx.closePath()
        ctx.stroke()
        if (this.hasBunny){
            ctx.save();
            ctx.translate(this.center.x, this.center.y);
            ctx.drawImage(bunnyImg, -bunnyImg.width / 2, -bunnyImg.height);
            ctx.restore();
        }
        if (this.target) {
            ctx.save()
            ctx.fillStyle = "gray"
            ctx.fill()
            ctx.restore()
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        entity.render()
    }
}

// GAME LOOP
let cancelId = 0

function update() {
    render();
    cancelId = requestAnimationFrame(update)
}

canvas.addEventListener("click", event => {
    const mx = event.offsetX-100
    const my = event.offsetY-150
    function pixel_to_hex(x, y){
        const q = x * 2/3 / 20
        const r = (-x / 3 + Math.sqrt(3)/3 * y) / 20
        const s = -q-r
        return cube_round({x:q, y:r, z:s})
    }
    function cube_round(h){
        var rx = Math.round(h.x)
        var ry = Math.round(h.y)
        var rz = Math.round(h.z)

        var x_diff = Math.abs(rx - h.x)
        var y_diff = Math.abs(ry - h.y)
        var z_diff = Math.abs(rz - h.z)

        if (x_diff > y_diff && x_diff > z_diff){
            rx = -ry-rz
        } else if (y_diff > z_diff) {
            ry = -rx-rz
        } else {
            rz = -rx-ry
        }

        return {rx, ry, rz}
    }
    function moveBunny(){
        const hex = pixel_to_hex(mx, my)
        const target = entities.filter(item => item.x === hex.rx && item.y === hex.ry)[0]
        if (target.hasBunny) {
            for (let i = -3+target.x ; i < 4+target.x; i++){
                let j = -3+target.y
                const maxj = 4+target.y
                for (; j < maxj; j++){
                    for (let z = -3+target.z; z < 4+target.z; z++)
                    if (i+j+z===0){
                        res = entities.filter(item => item.x === i && item.y === j)
                        if (res[0]){
                            res[0].target = 1
                        }
                    }
                }
            }
            return
        }
        if (target.target){
            entities.forEach(item => item.target = 0)
            target.hasBunny = 1
            oldBunny.hasBunny = 0
            oldBunny = target
            return
        }
        entities.forEach(item => item.target = 0)
    }
    moveBunny()
})

function init() {
    const size = 20
    const width = Math.sqrt(3)/2 * size*2
    for (let j = 0; j<9; j++){
        for (let i = 0; i < 20; i++){
            if (i%2){
                entities.push(new Hex({x:100+size*2/4*3*i, y:150+width/2+width*j}, i, j))
            } else {
                entities.push(new Hex({x:100+size*2/4*3*i, y:150+width*j}, i, j))
            }
        }
    }   
    entities.forEach(item => {
        item.x = item.q   
        item.y = item.r - (item.q - (item.q&1)) / 2
        item.z = -item.x -  item.y
    }) 
    entities[0].hasBunny = 1
    oldBunny = entities[0]
}

init()
cancelId = requestAnimationFrame(update)

