import service from "../../services/service.js"

export default{
    data(){
        return {
            komentari:[],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            dozvoljenaPrava:["administrator","korisnik"],
            dozvoljeneIzmene:["administrator"],
            pronadjena_izmena:false,
            metadata:{
                columns:[
                    {"key":"komentar_id","title":"Id"},
                    {"key":"opis","title":"Opis"},
                    {"key":"datum_kreiranja","title":"Datum Kreiranja"},   
                    {"key":"korisnicko_ime","title":"Autor"},
                    {"key":"naslov","title":"Naslov"},
                    
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
            service.findOne("/api/komentar/dobavi-komentare",this.$route.params.id).then(response=>{
            this.komentari = response.data;
        })

        if(this.decodedToken){
            this.pronadjena_izmena = this.dozvoljeneIzmene.some(r=> this.decodedToken.prava_pristupa.includes(r))
            }
    }},
    methods:{
        ukloni(id){
          service.delete('/api/komentar',id).then(response=>{
            service.findOne("/api/komentar/dobavi-komentare",this.$route.params.id).then(response=>{
                this.komentari = response.data;
            })
          })  
        }
        ,
        onAction(naziv,row){
            console.log(row);
            if(naziv == "izmeni"){
                this.$router.push({name:'forma_komentar',params:{id:`${row.komentar_id}`}});
                
            }else if(naziv == "ukloni"){
                this.ukloni(row.komentar_id);
                
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Komentari</h2>
        <br>
        <div v-for="komentar in komentari">        
        <template v-if="komentar['obrisan'] == 0">
        <div class="shadow p-3 mb-5 bg-body rounded" style="width:70%;margin:auto;">
            <h5>{{komentar['opis']}}</h5>
            <p><strong>Autor:{{komentar['korisnicko_ime']}}</strong></p>
            <p>{{komentar['datum_kreiranja']}}</p>
            <p>Komentar ID:{{komentar['komentar_id']}}</p>

            <template v-if="decodedToken.korisnik_id == komentar['korisnik_id'] || pronadjena_izmena">
                <span v-for="action in metadata.actions">
                
                    <button :class="action.class" v-on:click="onAction(action.name,komentar)">{{action.name}}</button>
                </span>
            </template>
        </div>
        </template>
    </div>
    `
}