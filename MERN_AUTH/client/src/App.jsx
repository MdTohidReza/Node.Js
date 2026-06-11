import React from "react";

const App = () => {


  const [products, setProduct] = React.useState(
  [
  {name:"Apple", Quantity: 10},
  {name:"Banana", Quantity: 20},
  {name:"Orange", Quantity: 15},
  {name:"Grapes", Quantity: 12},
]);

 const increase = (index) =>{
  const update = [...products]
  update[index] = {...update[index], Quantity: update[index].Quantity + 1}
  setProduct(update)
 }

 const decrease = (index)=>{
  const update = [...products]
  if(update[index].Quantity > 0){
    update[index] = {...update[index], Quantity: update[index].Quantity - 1}
  }
  setProduct(update)
 }


  return (
    <div border="1">
      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Product</th>
            <th className="border border-gray-400 px-4 py-4">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={item.name}>
              <td className="border border-gray-400 px-4 py-2">{item.name} </td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => decrease(index)}>
                  -
                </button>
                <span className="mx-3">{item.Quantity}</span>
                <button onClick={() => increase(index)}>
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 "
          onClick={() => setProduct(products.map((item)=>({...item, Quantity: item.Quantity + 1})))}
        >
          ADD1
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setProduct(products.map((item)=>({...item, Quantity: item.Quantity - 1})))}
        >
          SUB1
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setProduct(products.map((item)=>({...item, Quantity:0})))}
        >
          CLR
        </button>
      </div>
    </div>
  );
};

export default App;
