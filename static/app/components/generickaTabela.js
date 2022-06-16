export default{
    props:["rows","metadata","decodedToken","dozvoljenaPrava","dozvoljeneIzmene"],
    emits:["actionEvent"], 
    data(){
        return {
            pronadjen_pristup:false,
            pronadjena_izmena:false,
            pravo:false

        }
    },
    created(){
        this.proveri_prava_pristupa();
        this.proveri_prava_izmene();
    },
    methods:{
        onAction(action,row){
            this.$emit("actionEvent",{action,row});    
        },
        proveri_prava_pristupa(){
            if(this.decodedToken){
            this.pronadjen_pristup = this.dozvoljenaPrava.some(r=> this.decodedToken.prava_pristupa.includes(r))
            }
            
        },
        proveri_prava_izmene(){
            if(this.decodedToken){
            this.pronadjena_izmena = this.dozvoljeneIzmene.some(r=> this.decodedToken.prava_pristupa.includes(r))
            }
        }
    },
    template:`

        <table class="table table-bordered" v-if="pronadjen_pristup">
            <thead>
                <tr>
                <th v-for = "m in metadata.columns" style="text-align:center">
                    {{m['title']}}
                </th>
                <th></th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="row in rows">
                <template v-if="row['obrisan'] == 0">
                    <td v-for="m in metadata.columns" style="text-align:center">
                        {{row[m['key']]}}
                    </td>

                    
                <td style="text-align:center">
                    <template v-if="decodedToken.korisnik_id == row['korisnik_id'] || pronadjena_izmena">
                        <span v-for="action in metadata.actions">
                            <button :class="action.class" v-on:click="onAction(action.name,row)">{{action.name}}</button>
                        </span>
                    </template>

                <template v-else>
                    <template v-for="action in metadata.actions">
                    <span v-if="action['name'] == 'prikazi'">
                        <button :class="action.class" v-on:click="onAction('prikazi',row)">Prikazi</button>
                    </span>
                    </template>
                </template>
                    
                </td>
                </template>
                </tr>
            </tbody>
        </table>
    `
}
