import { useNavigate } from "react-router-dom";
import { Card, Table,Input } from "antd"
import './history.css'
  import { useEffect, useMemo,useState } from "react"
  
  const columns= [
      {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
      },
      {
          title: 'Temperature',
          dataIndex: 'temp',
          key: 'temp',
          render: (text) => <div>{text}</div>
      },
      {
          title: 'Unit',
          dataIndex: 'unit',
          key: 'unit',
          render: (text) => <div>{text !== "metric" ? '℉' : '℃'}   </div>
      },
      {
          title: 'Humidity',
          dataIndex: 'humidity',
          key: 'humidity',
          render: (text) => <div>{text}%</div>
      },
      {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
      },
      {
          title: 'icon',
          dataIndex: 'icon',
          key: 'icon',
          render: (text) => <img alt="" src={`https://openweathermap.org/img/wn/${text}@2x.png`}/> 
      }
  ]
  
  const RecentSearches = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    const storedData = JSON.parse(localStorage.getItem('weatherData') || '[]');
  
      const tableData = useMemo(()=>{
          return filteredData.map((element, idx) => {
               return {
                  key: (idx + 1).toString(),
                  city: element?.data?.name,
                  temp: element?.data?.main?.temp,
                  unit:element?.unit,
                  humidity:element?.data?.main?.humidity,
                  description:element?.data?.weather && element?.data?.weather[0]?.description,
                  icon:element?.data?.weather && element?.data?.weather[0]?.icon
              }
          })
      }, [filteredData])
  
      useEffect(() => {
        if (searchQuery === '') {
            setFilteredData(storedData);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = storedData.filter((element) => {
                return element?.data?.name?.toLowerCase().includes(lowerCaseQuery);
            });
            setFilteredData(filtered);
        }
    }, [searchQuery, storedData]);
    

      return <>
          <h4 style={{margin: '30px 0'}}>Recent History</h4>
          <button className='button' style={{margin:'10px'}} onClick={() => {
    navigate('/');
  }}>Home</button>
            <div style={{ marginBottom: 16 }}>
    <Input.Search
        placeholder="Search by city name"
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: 200 }}
    />
</div>

          <Table className="recent-searches-table" columns={columns} dataSource={tableData} pagination={false}  scroll={{ x: true }}/>
      </>
  }
  
  export default RecentSearches