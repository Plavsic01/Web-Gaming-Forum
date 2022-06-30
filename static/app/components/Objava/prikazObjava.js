import service from "../../services/service.js"

export default{
    data(){
        return {
            objave:[],
            // prava koja korisnik ima
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            pronadjena_izmena:false,
            // ko ima pravo da vidi ovaj sadrzaj
            dozvoljenaPrava:["administrator","korisnik"],
            // ko ima pravo da menja sadrzaj (izmena,brisanje)
            dozvoljeneIzmene:["administrator"],
            metadata:{
                // columns:[
                //     {"key":"objava_id","title":"Id"},
                //     {"key":"naslov","title":"Naslov"},
                //     {"key":"opis","title":"Opis"},
                //     {"key":"datum_kreiranja","title":"Datum Kreiranja"},
                //     {"key":"korisnicko_ime","title":"Autor"} 
                // ],
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
            service.findOne("/api/objava/dobavi-objave",this.$route.params.id).then(response=>{
            this.objave = response.data;
        })
    }
        if(this.decodedToken){
        this.pronadjena_izmena = this.dozvoljeneIzmene.some(r=> this.decodedToken.prava_pristupa.includes(r))
        }

    },
    methods:{
        ukloni(id){
          service.delete('/api/objava',id).then(response=>{
              service.findOne("/api/objava/dobavi-objave",this.$route.params.id).then(response=>{
                  this.objave = response.data;
              })
          })  
        },
        onAction(naziv,row){
            if(naziv == "izmeni"){
                this.$router.push({name:'forma_objava',params:{id:`${row.objava_id}`}});
            }else if(naziv == "ukloni"){
                this.ukloni(row.objava_id);
            }else if(naziv == "prikazi"){
                this.$router.push({name:'prikaz_komentar',params:{id:`${row.objava_id}`}});
            }
        }

    },
    template:`
        <br>
        <h2 style="text-align:center">Objave</h2>
        <br>  
        <div v-for="objava in objave">        
            <template v-if="objava['obrisan'] == 0">
            <div class="shadow p-3 mb-5 bg-body rounded" style="width:70%;margin:auto;">
                
                <h4>{{objava['naslov']}}</h4>
                <p>{{objava['opis']}}</p>
                <p><strong>Autor:{{objava['korisnicko_ime']}}</strong></p>
                <p>{{objava['datum_kreiranja']}}</p>
                <p>ID Objave:{{objava['objava_id']}}</p>
                
                <template v-if="decodedToken.korisnik_id == objava['korisnik_id'] || pronadjena_izmena">
                    <span v-for="action in metadata.actions">
                        <button :class="action.class" v-on:click="onAction(action.name,objava)">{{action.name}}</button>
                    </span>
                </template>
            
                <template v-else>
                        <template v-for="action in metadata.actions">
                        <span v-if="action['name'] == 'prikazi'">
                            <button :class="action.class" v-on:click="onAction('prikazi',objava)">Prikazi</button>
                        </span>
                        </template>
                </template>
                </div>
            </template>
        </div>

    `

    
}

//<genericka-tabela @action-event="onAction" v-bind:dozvoljeneIzmene="dozvoljeneIzmene" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:rows="objave" v-bind:decodedToken="decodedToken" v-bind:metadata="metadata"></genericka-tabela>   