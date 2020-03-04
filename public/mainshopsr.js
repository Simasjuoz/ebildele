function add(størrelse, bil, lager, pic, n){
  $('#'+n).html(`
  <a href="#" style="display:inline-block;" class="a">

        <p class="p">Størrelse: ${størrelse}"</p>
        <p class="p">Huller: ${bil}</p>
        <p class="p">PCD: ${lager}</p>
      </a>
      <a href="fælge.jpg"><img src="${pic}" class="pic"></a> <br>`);
}

button = document.getElementById("filter");
showallbutton = document.getElementById("showall");

button.onclick = function(){
  sizet = document.getElementById("Size").value;
  holest = document.getElementById("Holes").value;
  pcdt = document.getElementById("PCD").value;
  data = {size: sizet, holes: holest, pcd: pcdt};
  load(data, true);
}

let ul = document.getElementById("myUL");
async function load(dataset, f){
  let filter = f;
  let items = 0;
  const response2 = await fetch('/sendimgdata')
  const data2 = await response2.json();

  if (filter === false){
  const response = await fetch('/file_upload')
  const data = await response.json();


  
  
  for(items in data){
    
    const b64 = data[items].base64;
    g = document.createElement('li');
    g.setAttribute("id", `${items}`);
    g.setAttribute("class", "motion")
    ul.appendChild(g)
    add(data2[items].size1, data2[items].holes1, data2[items].pcd1, b64, items);
  }
  }
    if(filter === true){
      for(i = 0; i<data2.length; i++){
        await $('#'+i).show();
      }
      for(i = 0; i<data2.length; i++){
      console.log(i);
      if(data2[i].size1 !== dataset.size && dataset.size !== "-"){
        await $('#'+i).hide();
      }
      else if(data2[i].holes1 !== dataset.holes && dataset.holes !== "-"){
        await $('#'+i).hide();
      }
      else if(data2[i].pcd1 !== dataset.pcd && dataset.pcd !== "-"){
        await $('#'+i).hide();
      }
    }
    }
    filter = false;
    showallbutton.onclick = async function(){
      for(i = 0; i<data2.length; i++){
        await $('#'+i).show();
      }
    }

    items++;
}
load("", false);




let loadFile = function(event) {
	let image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}