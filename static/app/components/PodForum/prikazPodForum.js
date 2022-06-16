import service from "../../services/service.js"

export default{
    data(){
        return {
            podForumi:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["administrator","korisnik"],
            dozvoljeneIzmene:["administrator"],
            metadata:{
                columns:[
                    {"key":"pod_forum_id","title":"Id"},
                    {"key":"naslov","title":"Naslov"},
                    {"key":"datum_kreiranja","title":"Datum Kreiranja"},
                    {"key":"korisnicko_ime","title":"Autor"},
                     
                ],
                actions:[
                    {"name":"prikazi","title":"Prikazi","class":"btn btn-outline-success m-1"},
                    {"name":"izmeni","title":"Izmeni","class":"btn btn-outline-secondary m-1"},
                    {"name":"ukloni","title":"Ukloni","class":"btn btn-outline-danger m-1"}
                    
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem('token') ){
            service.findAll("/api/pod-forum").then(response=>{
            this.podForumi = response.data;
          
        })
    }
    },
    methods:{
        ukloni(id){
          service.delete('/api/pod-forum',id).then(response=>{
              service.findAll('/api/pod-forum').then(response=>{
                  this.podForumi = response.data;
              })
          })  
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_podforum',params:{id:`${event.row.pod_forum_id}`}});
            }else if(event.action == "ukloni"){
                this.ukloni(event.row.pod_forum_id);
            }else if(event.action == "prikazi"){
                this.$router.push({name:"prikaz_tema",params:{id:`${event.row.pod_forum_id}`}})
            }
        }
    },
    template:`
        <br>
        <br>
        <div style="width:80%;margin:auto;">
        <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="podForumi" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>   
        </div>
    `

    
}