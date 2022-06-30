import service from "../../services/service.js"

export default{
    data(){
        return {
            teme:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null), 
            dozvoljenaPrava:["administrator","korisnik"],
            dozvoljeneIzmene:["administrator"],
            metadata:{
                columns:[
                    {"key":"tema_id","title":"Id"},
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
            service.findOne("/api/tema/dobavi-teme",this.$route.params.id).then(response=>{
            this.teme = response.data;
        })
    }},
    methods:{
        ukloni(id){
          service.delete('/api/tema',id).then(response=>{
            service.findOne("/api/tema/dobavi-teme",this.$route.params.id).then(response=>{
                this.teme = response.data;
            })
          })  
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_tema',params:{id:`${event.row.tema_id}`}});
            }else if(event.action == "ukloni"){
                this.ukloni(event.row.tema_id);
            }else if(event.action == "prikazi"){
                this.$router.push({name:"prikaz_objava",params:{id:`${event.row.tema_id}`}})   
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Teme</h2>
        <br>
        <div style="width:80%;margin:auto;">
        <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="teme" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>   
        </div>
    `
}