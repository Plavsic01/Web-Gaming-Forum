import service from "../../services/service.js"

export default{
    data(){
        return {
            privilegije:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["administrator"],
            dozvoljeneIzmene:["administrator"],
            metadata:{
                columns:[
                    {"key":"privilegija_id","title":"Id"},
                    {"key":"tip_privilegije","title":"Tip Privilegije"},
                ],
                actions:[
                    {"name":"izmeni","title":"Izmeni","class":"btn btn-outline-secondary m-1"},
                    {"name":"ukloni","title":"Ukloni","class":"btn btn-outline-danger m-1"}
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem('token') ){
            service.findAll("/api/privilegija").then(response=>{
            this.privilegije = response.data;
        })
    }},
    methods:{
        ukloni(id){
          service.delete('/api/privilegija',id).then(response=>{
            service.findAll("/api/privilegija").then(response=>{
                this.privilegije = response.data;
            })
          })  
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_privilegija',params:{id:`${event.row.privilegija_id}`}});
                
            }else if(event.action == "ukloni"){
                this.ukloni(event.row.privilegija_id);
                
            }
        }
    },
    template:`
    <br>
    <br>
    <div style="width:80%;margin:auto;">
    <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="privilegije" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>   
    </div>
    `
}