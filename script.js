 const apikey =  `4cf9525b91140d1c31184648`;
 const apiURL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/`

//função para buscar taxa de cambio vai API

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
async function getExchengeRate (paraMoeda,daMoeda){
 try{
  const response = await fetch (`${apiURL}${daMoeda}`)
  const data = await response.json();

  if(data.result === 'success'){
    return data.conversion_rates[paraMoeda];
  }else{
    throw new console.error('erro au buscar as taxas de câmbio');
  }
 }catch (error){
     console.error("error:", error);
     return null;
   }
}
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
document.getElementById('currency-form').addEventListener('submit', async function(event){
  
    event.preventDefault();

    const valor = parseFloat(document.getElementById('amont').value);

    const daMoeda = document.getElementById('daMoeda').value;  
    const paraMoeda = document.getElementById('paraMoeda').value;  
    // busca de taxa de cambio via API 
    const exchangerate = await getExchengeRate(daMoeda,paraMoeda);

    if(exchangerate){
        const convertedValue = valor * exchangerate;

        const comversao = document.getElementById('conversao');
        comversao.textContent =`resultado ${convertedValue.toFixed(2)}${paraMoeda}`; 
        
    }else{
        alert("error ao buscar a cotação o dolar novamente.");
    }

})
