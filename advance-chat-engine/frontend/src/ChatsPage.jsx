import {MultiChatSocket,MultiChatWindow,useMultiChatLogic} from "react-chat-engine-advanced";

const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic('632b9c74-154d-4200-882f-6ecce6e1b992',
    props.user.username,
    props.user.secret
    );

    return (
        <div style={{height:'100vh'}}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{height:'100%'}}/>
        </div>
    )
  };
  export default ChatsPage;