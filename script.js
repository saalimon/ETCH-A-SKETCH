ready = (callback)=>{
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}
let gridSize = 10 //default grid size
var colors = ["red", "green" ,"blue", "white"];
var currentColor = "red"
ready(()=>{
    let container = document.createElement('div')
    let grid = document.createElement('div')
    let button = document.createElement('button')
    let row = document.createElement('div')
    let tail = document.createElement('p')
    let color = document.createElement('div')
    let reset = document.createElement('button')
    container.className = "container"
    container.id = "main-container"
    grid.className = "grid"
    grid.id = "main-grid"
    button.className = "button"
    button.id = "reset-button"
    button.innerHTML = "Change size"
    color.id = "center"
    reset.className = "button"
    reset.id = "reset-button"
    reset.innerHTML = "Reset"
    row.className = "row"
    tail.className = "center"
    tail.innerHTML = `This project is part of <a
    href="https://www.theodinproject.com/courses/web-development-101/lessons/etch-a-sketch-project">The Odin
    Project Curriculum</a>`
    document.body.appendChild(container)
    container.appendChild(row)
    row.appendChild(button)
    row.appendChild(color)
    row.appendChild(reset)
    row.appendChild(grid)
    document.body.appendChild(tail)
    setGridSize(grid,gridSize);
    fillGrid(grid,gridSize);
    button.addEventListener('click',() => {
        increseSize(grid)
    })
    reset.addEventListener('click',() => {
        clearGrid(grid)
        setGridSize(grid,gridSize);
        fillGrid(grid,gridSize);
    })
    for (let i = 0; i < colors.length ; i++) {
        const e = document.createElement("button");
        e.classList = "button";
        e.id = "reset-button" 
        e.innerHTML=  colors[i]
        e.style.backgroundColor = colors[i]
        e.style.color = colors[i] !== "white" ? "white":"black"
        e.addEventListener("click", selectColor);
        color.appendChild(e);
      }}
)

setGridSize = (grid,size) => {
    console.log(size)

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
}
fillGrid = (grid, size) =>  {
    for (let i = 0; i < size * size; i++) {
      const e = document.createElement("div");
      e.classList = "grid-element";
      e.addEventListener("mouseover", changeColor);
      grid.appendChild(e);
    }
}
clearGrid = (grid) => {
    let grids =Array.from(grid.childNodes);
    grids.forEach((e) => {
        grid.removeChild(e);
    });
  }
increseSize = (grid) =>{
    let newSize = prompt("Enter new size");
    if (newSize !== null) {
        newSize = parseInt(newSize);
        if (newSize < 1 || newSize > 64 || Number.isNaN(newSize)) {
          alert("Enter a number from 1-64 range");
          increseSize();
        } else {
          clearGrid(grid);
          setGridSize(grid,newSize);
          fillGrid(grid,newSize);
        }
      }
}
changeColor = (e) =>{
    e.target.style.backgroundColor = currentColor
}
selectColor = (e) =>{
    currentColor = e.target.innerHTML
}