
import React, { useEffect ,useState} from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import Messages from './Messages/Messages';


let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const location = useLocation();
    const [message,setMessage]=useState([])
    const [messages,setMessages]=useState([])
    const [users,setUsers]=useState('')
    const ENDPOINT='http://localhost:5000'
    
   
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket=io(ENDPOINT)
        
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},(error)=>{
            // alert(`${name} joined the ${room}`)
        })
        console.log('end point changed')
      
        console.log(socket)
    }, [ENDPOINT,location.search]); 

    useEffect(()=>{
        // console.log('called')
        socket.on('message',(message)=>{
            setMessages([...messages,message])

        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
       
    },[messages])
    const sendmessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''))
            
        }
        console.log('data sent')
           
    }
    


  

  
  
  

    return (
        
        <div>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input setMessage={setMessage} sendmessage={sendmessage} message={message}/>
       
             
        </div>
    );  
};

export default Chat;
