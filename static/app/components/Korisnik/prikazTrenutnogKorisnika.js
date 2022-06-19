import service from "../../services/service.js"

export default{
    data(){
        return {
            korisnik:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["korisnik","administrator"],
            dozvoljeneIzmene:[], // prazne izmene -> samo korisnik ciji je nalog menja!
            metadata:{
                columns:[
                    {"key":"korisnik_id","title":"Id"},
                    {"key":"korisnicko_ime","title":"Korisnicko ime"},
                    {"key":"email","title":"Email"},
                    {"key":"lozinka","title":"Lozinka"},
                    {"key":"datum_kreiranja","title":"Datum Kreiranja"}   
                ],
                actions:[
                    {"name":"izmeni","title":"Izmeni","class":"btn btn-outline-secondary m-1"}
                    
                ]
            }
        }
    },
    created(){
        if(localStorage.getItem('token') ){
            service.findOne("/api/korisnik/",this.decodedToken['korisnik_id']).then(response=>{
                this.korisnik.push(response.data);          
            })
        }

        
    },
    methods:{
        ukloni(id){
          service.delete('/api/korisnik',id).then(response=>{
              service.findAll('/api/korisnik').then(response=>{
                  this.korisnik = response.data;
              })
          })  
        }
        ,
        onAction(event){
            if(event.action == "izmeni"){
                this.$router.push({name:'forma_korisnika',params:{id:`${event.row.korisnik_id}`}});
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Moj Profil</h2>
        <br>
        <div style="width:80%;margin:auto;">
        <genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="korisnik" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>
        </div>
    `
}