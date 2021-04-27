// Generates a random HEX color, different from others
exports.randomColor = function(colors) {
    do {
        let f = (n,k=(n*12)%12) => .5-.5*Math.max(Math.min(k-3,9-k,1),-1)
        let rgb2hex = (r,g,b) => "#"+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,0)).join('')
        let result = rgb2hex(f(0), f(8), f(4))
    } while (!colors.includes(result))
    return result
}