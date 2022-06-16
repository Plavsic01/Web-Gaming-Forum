import service from "../../services/service.js"

export default{
    data(){
        return {
            korisnici:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["administrator"],
            dozvoljeneIzmene:["administrator"],
            metadata:{
                columns:[
                    {"key":"korisnik_id","title":"Id"},
                    {"key":"korisnicko_ime","title":"Korisnicko ime"},
                    {"key":"email","title":"Email"},
                    {"key":"lozinka","title":"Lozinka"},
                    {"key":"datum_kreiranja","title":"Datum Kreiranja"}   
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
            service.findAll("/api/korisnik/").then(response=>{
                this.korisnici = response.data;            
            })
        }

        
    },
    methods:{
        ukloni(id){
          service.delete('/api/korisnik',id).then(response=>{
              service.findAll('/api/korisnik').then(response=>{
                  this.korisnici = response.data;
              })
          })  
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_korisnika',params:{id:`${event.row.korisnik_id}`}});
            }else if(event.action == "ukloni"){
                this.ukloni(event.row.korisnik_id);
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Korisnici</h2>
        <br>
        <div style="width:80%;margin:auto;">
        <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="korisnici" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>
        </div>
    `
}