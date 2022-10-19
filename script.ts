const canvas = document.querySelector('#canvas') as HTMLCanvasElement
const ctx:CanvasRenderingContext2D = canvas?.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#000'

let fontsize: number = 20

class Characters{
    characters:string = '01234567890@#$%^&*(){}*/+-<>'
    text:string = ''
    constructor(private x:number, private y:number, private canvasHeight:number) {
    }
    draw(ctx: any){
        let random = Math.floor(Math.random() * this.characters.length);
        this.text = this.characters.charAt(random)
        //styling canvas 
        ctx.fillStyle = 'limegreen';
        ctx.fillText(this.text, this.x * fontsize, this.y * fontsize)

        //condtion if the y axis is > canvas height
        if(this.y * fontsize > this.canvasHeight && Math.random() > 0.9) {
            this.y = 0;
        }else {
            this.y += 1;
        }
    }
}

class Effects {
    columns: number = this.canvasWidth / fontsize
    symbols: any[]= []
    constructor( public canvasWidth: number,  public canvasHeight: number) {
        this.start()
    }

    // here '#' means private
    start():void{
        for(let i:number = 0; i < this.columns; i++) {
            this.symbols[i] = new Characters(i, 0, this.canvasHeight);
        }
    }
    resize(width:number, height:number) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / fontsize
        this.symbols = []
        this.start()
    }
}

const eff = new Effects(canvas.width, canvas.height)
const fps = 30;
function animateLoop() {
    //for transparent effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0,0, canvas.width, canvas.height)

    ctx.font = fontsize + 'px monospace'
    eff.symbols.forEach(symbol => symbol.draw(ctx))
    //requestAnimationFrame(animateLoop)
}
animateLoop()
setInterval(animateLoop, 1000/fps)

window.addEventListener('resize', _ => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    eff.resize(canvas.width, canvas.height)
})


