export default{
    data(){
        return {
            privilegije:[],
            api_path:"/api/privilegija",
            dozvoljenaPrava:["administrator"],
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
            metadata:{
                columns:[
                    {"key":"tip_privilegije","title":"Tip Privilegije","type":"text"}
                ],
                edit_columns:[
                    {"key":"tip_privilegije","title":"Tip Privilegije","type":"text"}
                ]
            }
        }
    },
    template:`
        <br>
        <h2 style="text-align:center">Kreiraj Komentar</h2>
        <genericka-forma :rows="privilegije" v-bind:dozvoljenaPrava="dozvoljenaPrava" v-bind:decodedToken="decodedToken" :api_path="api_path" :metadata="metadata"></genericka-forma>
    `
}