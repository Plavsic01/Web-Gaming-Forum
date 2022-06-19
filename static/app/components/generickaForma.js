import service from "../services/service.js"

export default{
    props:["rows","metadata","api_path","decodedToken","dozvoljenaPrava"],
    data(){
        return {
            podaci:{},
            izmeni:false,
            pronadjen_pristup:false
        }
    },
    created(){
        if(this.$route.params.id != undefined){            
            service.findOne(this.api_path,this.$route.params.id).then(response=>{
            this.podaci = response.data;
            this.izmeni = true;            
        })
    }
        if(this.decodedToken){
            this.pronadjen_pristup = this.dozvoljenaPrava.some(r=> this.decodedToken.prava_pristupa.includes(r))
            }
    },
    methods:{
        dodaj_izmeni(){
            if(this.$route.params.id != undefined){                
                service.update(this.api_path,this.$route.params.id,this.podaci).then(response=>{
                    this.$router.push("/");
                }).catch(err=>{
                    window.alert("Dogodila se greska prilikom izmene!");
                })
            }else{
                service.create(this.api_path,this.podaci).then(response=>{
                    this.$router.push("/");
                }).catch(err=>{
                    window.alert("Dogodila se greska prilikom dodavanja!");
                })
            }
        }
    },
    template:`

    <br>
    <div style="width:30%;margin:auto;">
    <form v-if="!izmeni" v-on:submit.prevent="dodaj_izmeni()">
    <template v-if="pronadjen_pristup">
    <div v-for="m in metadata.columns">
        <label>{{m['title']}}</label>

        <template v-if="m['type'] === 'select'">        
            <select class="form-control" v-model="podaci[m['key']]" required>
                <template v-for="row in rows">
                <option v-if="row['obrisan'] == 0" :value="row[m['id']]">{{row[m['value']]}}</option>
                </template>
            </select>
        </template>

        <template v-else>
            <template v-if="m['type'] != 'textarea'">
            <input class="form-control form-control-md" :type="m['type']" v-model="podaci[m['key']]" required>
            </template>
            <template v-else>
            <textarea class="form-control" v-model="podaci[m['key']]"></textarea>
            </template>
        </template>         
    </div>
    <div style="text-align:center">
    <button class="btn btn-outline-success m-1" type="submit">Dodaj</button>
    </div>
    </template>
    </form>
    </div>


    <div style="width:30%;margin:auto;">
    <form v-if="izmeni" v-on:submit.prevent="dodaj_izmeni()">
    <template v-if="pronadjen_pristup">
    <div v-for="m in metadata.edit_columns">
        <label>{{m['title']}}</label>

        <template v-if="m['type'] === 'select'">        
            <select class="form-control" v-model="podaci[m['key']]" required>
                <template v-for="row in rows">  
                    <option v-if="row['obrisan'] == 0" :value="row[m['id']]">{{row[m['value']]}}</option>
                </template>
            </select>
        </template>

        <template v-else>
            <template v-if="m['type'] != 'textarea'">
            <input class="form-control form-control-md" :type="m['type']" v-model="podaci[m['key']]" required>
            </template>
            <template v-else>
            <textarea class="form-control" v-model="podaci[m['key']]"></textarea>
            </template>
        </template>            
    </div>

    <div style="text-align:center">
    <button class="btn btn-outline-secondary m-1" type="submit">Izmeni</button>
    </div>
    </template>
    </form>
    </div>


    `
}