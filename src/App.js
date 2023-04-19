import "./style.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showUsers = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get(
          "https://api.escuelajs.co/api/v1/products"
        )
        .then((res) => {
          setUserList(res.data);
          setIsLoading(false);
        });
    }, 3000);
  };

  useEffect(() => {
    setIsLoading(true);
    showUsers();
  }, []);

  return (
    <div className="App">
      
      {isLoading === false &&
        userList.map((user) => (
          <div className="card">
            <img
              src={user.images}
            
            />
            <h1>{user.title}</h1>
            <h2>{user.description || <Skeleton baseColor="gray" />}</h2>
            <h3>{user.price || <Skeleton />} $</h3>
          </div>
        ))}
      {isLoading === true && (
        <div className="fleex">
          <div className="card">
            <h1>
              <Skeleton />
            </h1>
          </div>
          <div className="card">
            <h1>
              <Skeleton  baseColor="gray" height={"80px"}/>
            </h1>
          </div>
        
        </div>
      )}
    </div>
  );
  
}