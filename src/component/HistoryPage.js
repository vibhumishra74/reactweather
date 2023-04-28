import { useNavigate } from "react-router-dom";
import { Card, Table } from "antd"
import './history.css'
  import { useMemo } from "react"
  
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
    const storedData = JSON.parse(localStorage.getItem('weatherData') || '[]');
  
      const tableData = useMemo(()=>{
          return storedData.map((element, idx) => {
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
      }, [storedData])
  
      return <>
          <h4 style={{margin: '30px 0'}}>Recent Searches</h4>
          <button className='button' style={{margin:'10px'}} onClick={() => {
    navigate('/');
  }}>Home</button>
          <Table className="recent-searches-table" columns={columns} dataSource={tableData} pagination={false}  scroll={{ x: true }}/>
      </>
  }
  
  export default RecentSearches