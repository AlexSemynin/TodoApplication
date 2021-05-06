import { inject, observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import AutoStore from '../../../Store/AutoStore';
import Aphorism from '../Aphorism/Aphorism';
import classes from './MainPage.module.scss';


// @inject("AutoStore")
// @observer
// export default class MainPag extends React.Component<{AutoStore: AutoStore}, {data: string}>{

//     private get autoStore(){
//         return this.props.AutoStore;
//     } 

//     constructor(props: {AutoStore: AutoStore}){
//         super(props);
//         this.state = {data: ""};
//     }


//     async submitRequest(){
//         try{
//             const token = this.autoStore.getUser?.access_token;
//             // const token = props?.AutoStore?.getUser.access_token;
//             let response = await fetch('/api/todos/getlogin', {
//                 method: "GET",
//                 headers:{
//                     "Content-Type": "application/json",
//                     "Authorization": "Bearer " + token  // передача токена в заголовке
//                 }
//             });
//             if (!response.ok) {
//                 const message = JSON.parse(await response.text()).errorText;
//                 throw new Error(`Ответ сервера: ${message}`);
//             }else{
//                 const data = await response.text();
//                 this.setState({data});
//             }
//         }catch(e){
//             throw new Error(e);
//         }
//     }

//     render(){
//         console.log('rendermainPage');
//         console.log(`isLogin - ${this.autoStore.isLogin}`);
//         console.log(`user email = ${this.autoStore.getUser?.email}`);
//         return(
//             <div>
//              <button onClick={this.submitRequest.bind(this)}>Сделать запрос</button>
//              <div>
//                  {
//                     !!this.state.data ?
//                      <span>{this.state.data}</span>
//                      :<span>тут будет отображаться инфо о пользователе</span>
//                  }
//              </div>
//          </div>
//         )
//     }
// }

const MainPage = inject("AutoStore")(observer((props: React.PropsWithChildren<{AutoStore?: AutoStore}>) => {

    return(
        <div className={classes.MainPage}>
            <Aphorism/>
        </div>
    )
}));

export default MainPage;