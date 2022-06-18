import service from "../services/service.js"

export default{
    props:["metadata","api_path","decodedToken"],
    data(){
        return {
            podaci:{},
            pronadjena_pretraga:false,
            podaci_pretrage:[],
            token_postoji:false
        }
    },
    created(){
        if(this.decodedToken){
            this.token_postoji = true;
        }
    },
    methods:{
        pretrazi(){
            service.create(this.api_path,this.podaci).then(response=>{
                this.pronadjena_pretraga = true;
                this.podaci_pretrage = response.data;                
            })
        }
    },
    template:`

    <br>
    <div style="width:30%;margin:auto;">
    <form v-on:submit.prevent="pretrazi()">
    <template v-if="token_postoji">
    <div v-for="m in metadata.form_columns">
        <label>{{m['title']}}</label>    
        <template v-if="m['type'] != 'textarea'">
        <input class="form-control form-control-md" :type="m['type']" v-model="podaci[m['key']]">
        </template>
        <template v-else>
        <textarea class="form-control" v-model="podaci[m['key']]"></textarea>
        </template>
    </div>
    <div style="text-align:center">
    <button class="btn btn-outline-success m-1" type="submit">Pretrazi</button>
    </div>
    </template>
    </form>
    </div>


<template v-if="pronadjena_pretraga">
    <template v-if="token_postoji">
    <table class="table table-bordered">
    <thead>
        <tr>
        <th v-for = "m in metadata.table_columns" style="text-align:center">
            {{m['title']}}
        </th>
        </tr>
    </thead>
    
    <tbody>
        <tr v-for="podatak in podaci_pretrage">
        <template v-if="podatak['obrisan'] == 0">
            <td v-for="m in metadata.table_columns" style="text-align:center">
                {{podatak[m['key']]}}
            </td>
        </template>
        </tr>
    </tbody>
    </table>
    </template>
</template>
    `

}