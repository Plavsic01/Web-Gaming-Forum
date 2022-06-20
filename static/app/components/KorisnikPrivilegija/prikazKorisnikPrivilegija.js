import service from "../../services/service.js"

export default{
    data(){
        return {
            korisnici_privilegije:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["administrator","korisnik"],
            dozvoljeneIzmene:["administrator"],
            metadata:{
                columns:[
                    {"key":"id","title":"Id"},
                    {"key":"korisnik_id","title":"Korisnik Id"},
                    {"key":"privilegija_id","title":"Privilegija Id"},
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
            service.findAll("/api/korisnik-privilegija").then(response=>{
            this.korisnici_privilegije = response.data;
          
        })
    }
    },
    methods:{
        ukloni(id){
          service.delete('/api/korisnik-privilegija',id).then(response=>{
              service.findAll('/api/korisnik-privilegija').then(response=>{
                  this.korisnici_privilegije = response.data;
              })
          })
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_korisnik_privilegija',params:{id:`${event.row.id}`}});
            }else if(event.action == "ukloni"){
                this.ukloni(event.row.id);
            }
        }
    },
    template:`
        <br>        
        <div style="text-align:center;width:80%;margin:auto;">
        <h2>Korisnici Privilegije</h2>
        <br>
        <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="korisnici_privilegije" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>   
        </div>
    `

    
}