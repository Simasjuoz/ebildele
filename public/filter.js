
button = document.getElementById("filter");

button.onclick = function(){
  sizet = document.getElementById("Size").value;
  holest = document.getElementById("Holes").value;
  pcdt = document.getElementById("PCD").value;
  data = {size: sizet, holes: holest, pcd: pcdt};
  load(dataset);
}

async function load(dataset){
  const response2 = await fetch('/sendimgdata')
  const data2 = await response2.json();
  console.log(data2);
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  var input, filter, ul, li, a, i, txtValue;
  input = dataset;
 


  // Loop through all list items, and hide those who don't match the search query  
  let items = 0;
  for(items in data2){
  }
  
}
load();
