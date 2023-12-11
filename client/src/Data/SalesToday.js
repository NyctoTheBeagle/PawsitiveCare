import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesToday = () => {
  const [salesToday, setSalesToday] = useState(0);

  useEffect(() => {
    const getSalesToday = async () => {
      try {
        const res = await axios.get('/api/v1/analytics/sales-today', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.data.success) {
          setSalesToday(res.data.salesToday);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    getSalesToday();
  }, []);

  return (
  <p className='w-22 mb-10'>Sales Today: {salesToday}</p>
  );

};

export default SalesToday;