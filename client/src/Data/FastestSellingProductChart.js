import React from 'react';
import "../styles/Dashboard.css"

const FastestSellingProductChart = ({ fastestSellingProducts }) => {
  return (
    <div className=''>
      <h2 className='text-2xl font-semibold mb-3'>Fastest Selling Products: </h2>
      <ul>
        {fastestSellingProducts.map((product, index) => {
          // Find the highest stocksOut value
          const highestStocksOut = fastestSellingProducts.reduce(
            (maxStocksOut, product) => Math.max(maxStocksOut, product.stocksOut),
            0
          );

          // Display only the products with the highest stocksOut
          return product.stocksOut === highestStocksOut && (
            <li key={index}>
              <strong>{product.productName}</strong> <br></br> Total Sales: {product.totalSales}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FastestSellingProductChart;